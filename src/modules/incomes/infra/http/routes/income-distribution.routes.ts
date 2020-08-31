import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';

import IncomeDistributionController from '../../controllers/IncomeDistributionController';

const incomeDistributionRouter = Router();
const incomeDistributionController = new IncomeDistributionController();

incomeDistributionRouter.use(ensureAuthenticated);

incomeDistributionRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  incomeDistributionController.index,
);

incomeDistributionRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.array().items({
      id: Joi.string().required(),
      percentage: Joi.number().required(),
    }),
  }),
  incomeDistributionController.update,
);

export default incomeDistributionRouter;
