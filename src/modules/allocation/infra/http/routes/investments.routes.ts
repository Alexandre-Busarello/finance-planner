import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import InvestmentController from '../../controllers/InvestmentController';

const investmentRouter = Router();
const investmentController = new InvestmentController();

investmentRouter.use(ensureAuthenticated);

investmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      objective_percentage: Joi.number(),
      is_dollar: Joi.boolean(),
    },
  }),
  investmentController.create,
);

export default investmentRouter;
