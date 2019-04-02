import R from 'ramda';
import Sequelize from 'sequelize';
import path from 'path';
import rqAll from 'require-all';
import creden from './credentials';
import config from './config';

class DatabaseCore {
    async startConnection() {
        const sequelize = new Sequelize(creden.getCredentials(), config);
        await sequelize.authenticate();
        this.initModels(sequelize);
        return sequelize;
    }

    initModels(sequelize) {
        const files = rqAll(path.join(__dirname, '../../api/models'));
        const models = R.mapObjIndexed(
            model => R.prop('default', model).init(sequelize, Sequelize),
            files,
        );
        
        const startAssociation = R.compose(
            R.forEach(model => model.associate(models)),
            R.filter(model => typeof model.associate === 'function'),
            R.values,
        );

        startAssociation(models);
        // eslint-disable-next-line no-return-assign
        R.forEachObjIndexed((model, modelName) => global[modelName] = model, models);

        return models;
    }
}

const db = new DatabaseCore();
export default db;


// function


// sequelize.authenticate().then((e) => {
//     winston.info("hola")
//     // console.log(e);
// }).catch((er) => {
//     winston.error(er);
// })
// console.log(sequelize);
// pass your sequelize config here


// console.log(v);

// const FirstModel = require("./first-model");
// const SecondModel = require("./second-model");
// const ThirdModel = require("./third-model");

// const models = {
//   First: FirstModel.init(sequelize, Sequelize),
//   Second: SecondModel.init(sequelize, Sequelize),
//   Third: ThirdModel.init(sequelize, Sequelize)
// };

// // Run `.associate` if it exists,
// // ie create relationships in the ORM
// Object.values(models)
//   .filter(model => typeof model.associate === "function")
//   .forEach(model => model.associate(models));

// const db = {
//   ...models,
//   sequelize
// };
