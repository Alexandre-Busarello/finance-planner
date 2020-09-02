import { Router } from 'express';
import usersRouters from '@modules/users/infra/http/routes/users.routes';
import sessionsRouters from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import monthlyIncomesRouter from '@modules/incomes/infra/http/routes/monthly-income.routes';
import incomeDistributionRouter from '@modules/incomes/infra/http/routes/income-distribution.routes';
import totalAvailableRouter from '@modules/incomes/infra/http/routes/total-available.routes';

import expensesRouter from '@modules/allocation/infra/http/routes/expenses.routes';
import investmentsRouter from '@modules/allocation/infra/http/routes/investments.routes';
import plansRouter from '@modules/allocation/infra/http/routes/plans.routes';
import incomeExpensesDistributionRouter from '@modules/allocation/infra/http/routes/income-distribution.routes';

const routes = Router();

routes.use('/users', usersRouters);
routes.use('/sessions', sessionsRouters);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/monthly-incomes', monthlyIncomesRouter);
routes.use('/incomes-distribution', incomeDistributionRouter);

routes.use('/expenses', expensesRouter);
routes.use('/investments', investmentsRouter);
routes.use('/plans', plansRouter);
routes.use('/incomes-distribution', incomeExpensesDistributionRouter);

routes.use('/total-available', totalAvailableRouter);

export default routes;
