import { Router } from 'express';
import usersRouters from '@modules/users/infra/http/routes/users.routes';
import sessionsRouters from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import monthlyIncomesRouter from '@modules/incomes/infra/http/routes/monthly-income.routes';

const routes = Router();

routes.use('/users', usersRouters);
routes.use('/sessions', sessionsRouters);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/monthly-incomes', monthlyIncomesRouter);

export default routes;
