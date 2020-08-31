import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import IncomeExpenseDistributionController from '@modules/allocation/infra/controllers/IncomeExpenseDistributionController';

const incomeExpenseDistributionRouter = Router();
const incomeExpenseDistributionController = new IncomeExpenseDistributionController();

incomeExpenseDistributionRouter.use(ensureAuthenticated);

incomeExpenseDistributionRouter.post(
  '/:origin_id/expenses/:expense_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      value: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      expense_id: Joi.string().required(),
      origin_id: Joi.string().required(),
    },
  }),
  incomeExpenseDistributionController.create,
);

export default incomeExpenseDistributionRouter;
