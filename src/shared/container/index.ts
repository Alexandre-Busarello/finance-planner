import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import MonthlyIncomeRepository from '@modules/incomes/infra/typeorm/repositories/MonthlyIncomeRepository';
import IMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/IMonthlyIncomeRepository';
import IIncomeDistributionSettingsRepository from '@modules/incomes/repositories/IncomeDistributionSettings/IIncomeDistributionSettingsRepository';
import IncomeDistributionSettingsRepository from '@modules/incomes/infra/typeorm/repositories/IncomeDistributionSettingsRepository';
import IIncomeDistribution from '@modules/incomes/repositories/IncomeDistribution/IIncomeDistribution';
import IncomeDistributionRepository from '@modules/incomes/infra/typeorm/repositories/IncomeDistributionRepository';
import IExpenseRepository from '@modules/allocation/repositories/Expense/IExpenseRepository';
import ExpenseRepository from '@modules/allocation/infra/typeorm/repositories/ExpenseRepository';
import IInvestmentRepository from '@modules/allocation/repositories/Investment/IInvestmentRepository';
import InvestmentRepository from '@modules/allocation/infra/typeorm/repositories/InvestmentRepository';
import IPlanRepository from '@modules/allocation/repositories/Plan/IPlanRepository';
import PlanRepository from '@modules/allocation/infra/typeorm/repositories/PlanRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IMonthlyIncomeRepository>(
  'MonthlyIncomeRepository',
  MonthlyIncomeRepository,
);

container.registerSingleton<IIncomeDistributionSettingsRepository>(
  'IncomeDistributionSettingsRepository',
  IncomeDistributionSettingsRepository,
);

container.registerSingleton<IIncomeDistribution>(
  'IncomeDistributionRepository',
  IncomeDistributionRepository,
);

container.registerSingleton<IExpenseRepository>(
  'ExpenseRepository',
  ExpenseRepository,
);

container.registerSingleton<IInvestmentRepository>(
  'InvestmentRepository',
  InvestmentRepository,
);

container.registerSingleton<IPlanRepository>('PlanRepository', PlanRepository);
