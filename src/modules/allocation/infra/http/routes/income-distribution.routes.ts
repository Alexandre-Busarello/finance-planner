import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import IncomeExpenseDistributionController from '@modules/allocation/infra/controllers/IncomeExpenseDistributionController';
import IncomeInvestmentDistributionController from '../../controllers/IncomeInvestmentDistributionController';
import IncomePlanDistributionController from '../../controllers/IncomePlanDistributionController';

const incomeDistributionRouter = Router();
const incomeExpenseDistributionController = new IncomeExpenseDistributionController();
const incomeInvestmentDistributionController = new IncomeInvestmentDistributionController();
const incomePlanDistributionController = new IncomePlanDistributionController();

incomeDistributionRouter.use(ensureAuthenticated);

incomeDistributionRouter.post(
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

incomeDistributionRouter.post(
  '/:origin_id/investments/:investment_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      value: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      investment_id: Joi.string().required(),
      origin_id: Joi.string().required(),
    },
  }),
  incomeInvestmentDistributionController.create,
);

incomeDistributionRouter.post(
  '/:origin_id/plans/:plan_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      value: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      plan_id: Joi.string().required(),
      origin_id: Joi.string().required(),
    },
  }),
  incomePlanDistributionController.create,
);

export default incomeDistributionRouter;
