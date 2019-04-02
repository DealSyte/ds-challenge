import routes from '../api/routes';
// console.log(routes);
const setRouter = app => app.use('/api', routes);

export default setRouter;
