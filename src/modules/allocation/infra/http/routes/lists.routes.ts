import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import ListsController from '../../controllers/ListsController';

const listsRouter = Router();
const listsController = new ListsController();

listsRouter.use(ensureAuthenticated);

listsRouter.get('/', listsController.index);

export default listsRouter;
