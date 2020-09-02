import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import PlanController from '../../controllers/PlanController';

const planRouter = Router();
const planController = new PlanController();

planRouter.use(ensureAuthenticated);

planRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      objective_value: Joi.number().required(),
    },
  }),
  planController.create,
);

export default planRouter;
