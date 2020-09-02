import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';

import TotalAvailableController from '../../controllers/TotalAvailableController';

const totalAvailableRouter = Router();
const totalAvailableController = new TotalAvailableController();

totalAvailableRouter.use(ensureAuthenticated);

totalAvailableRouter.get('/', totalAvailableController.index);

export default totalAvailableRouter;
