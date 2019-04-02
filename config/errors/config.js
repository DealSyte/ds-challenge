const fs = require('fs');
const path = require('path');
const merge = require('lodash/merge');
const find = require('lodash/find');
const rqAll = require('require-all');

const defaultOpts = {
  unknownError: {
    code: 'unknownError',
    description: 'Please contact the API provider for more information.',
    status: 500,
  },
};


function CanoError(err = 'An error has occurred.', opts = {}) {
  this.original = typeof err === 'string' ? new Error(err) : err;
  opts = merge({}, defaultOpts.unknownError, opts);
  const {
    description, status, code, data,
  } = opts;
  this.content = {
    code,
    description,
  };
  this.fullContent = {
    code,
    description,
    message: this.original.message,
  };
  this.status = status;
  this.message = this.original.message;
  if (data) {
    this.content.data = data;
    this.fullContent.data = data;
  }
}

Object.defineProperty(CanoError, 'handler', {
  value(err, opts = {}) {
    if (!(err instanceof CanoError)) {
      err = new CanoError(err, opts);
    }
    return err;
  },
  enumerable: false,
});

function getFiles(_path) {
  const files = path.join(_path, '/errors');
  return fs.existsSync(files) ? rqAll(files) : {};
}

function buildOpts(data) {
  const { opts = defaultOpts } = data;
  delete data.opts;
  return opts;
}

function buildConstructor(typesErrors, userOpts) {
  return function (code, err, data) {
    const opts = {};
    const { unknownError = {} } = userOpts;
    if (code !== 'unknownError') {
      const result = find(typesErrors, (value, name) => name === code);
      if (result) {
        const { description, status } = result;
        merge(opts, unknownError, { description, status, code });
      } else {
        merge(opts, unknownError);
      }
    } else {
      merge(opts, unknownError);
    }
    if (data) {
      merge(opts, { data });
    }
    CanoError.call(this, err, opts);
  };
}

function buildHandlerMethod(ClassError) {
  Object.defineProperty(ClassError, 'handler', {
    value(err) {
      if (!(err instanceof CanoError)) {
        err = new ClassError('unknownError', err);
      }
      return err;
    },
    enumerable: false,
  });
}

function buildErrors() {
  const files = getFiles(path.join(__dirname, '../../api'));
  Object.keys(files).forEach((fileName) => {
    const typesErrors = files[fileName];
    const opts = buildOpts(typesErrors);
    const { className = fileName } = opts;
    const ClassError = buildConstructor(typesErrors, opts);
    ClassError.prototype = Object.create(CanoError.prototype);
    ClassError.prototype.constructor = ClassError;
    buildHandlerMethod(ClassError);
    global[className] = ClassError;
  });

  /*
    Catch any error thrown for an async function and delegate the error to 
    the express global error handler
  */
  global.errorWrap = middleware => (req, res, next) => {
    middleware(req, res, next).catch(next);
  };
}

export default {
  buildErrors,
};
