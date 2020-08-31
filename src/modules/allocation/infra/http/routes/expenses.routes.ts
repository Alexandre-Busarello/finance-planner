import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import ExpenseController from '@modules/allocation/infra/controllers/ExpenseController';

const expenseRouter = Router();
const expenseController = new ExpenseController();

expenseRouter.use(ensureAuthenticated);

expenseRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  expenseController.create,
);

export default expenseRouter;
