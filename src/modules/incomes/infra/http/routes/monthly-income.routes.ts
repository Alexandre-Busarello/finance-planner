import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';

import MonthlyIncomeController from '../../controllers/MonthlyIncomeController';

const monthlyIncomeRouter = Router();
const monthlyIncomeController = new MonthlyIncomeController();

monthlyIncomeRouter.use(ensureAuthenticated);

monthlyIncomeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
      value: Joi.number().required(),
    },
  }),
  monthlyIncomeController.create,
);

export default monthlyIncomeRouter;
