import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';

import MonthsAvailableController from '../../controllers/MonthsAvailableController';

const monthsAvailableRouter = Router();
const monthsAvailableController = new MonthsAvailableController();

monthsAvailableRouter.use(ensureAuthenticated);

monthsAvailableRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      year: Joi.number().required(),
    },
  }),
  monthsAvailableController.index,
);

export default monthsAvailableRouter;
