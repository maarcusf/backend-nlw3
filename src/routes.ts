import {Router} from 'express';
import OrphanagesController from './controllers/OrphanagesController'

const routes = Router();

//MVC - Model - View - Controllers
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages',OrphanagesController.create);

export default routes;