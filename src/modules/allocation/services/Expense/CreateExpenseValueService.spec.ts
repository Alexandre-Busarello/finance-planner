// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeExpenseRepository from '@modules/allocation/repositories/Expense/fakes/FakeExpenseRepository';
import FakeIncomeDistributionRepository from '@modules/incomes/repositories/IncomeDistribution/fakes/FakeIncomeDistributionRepository';
import CreateExpenseValueService from './CreateExpenseValueService';

let fakeUsersRepository: FakeUsersRepository;
let fakeExpenseRepository: FakeExpenseRepository;
let fakeIncomeDistributionRepository: FakeIncomeDistributionRepository;
let createExpenseValueService: CreateExpenseValueService;

describe('CreateExpenseValueService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeExpenseRepository = new FakeExpenseRepository();
    fakeIncomeDistributionRepository = new FakeIncomeDistributionRepository();
    createExpenseValueService = new CreateExpenseValueService(
      fakeExpenseRepository,
    );
  });

  it('should be able to create an expense value to one expense list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const expenseList = await fakeExpenseRepository.create({
      name: 'Expenses',
      user_id: user.id,
    });

    const incomeDistribution = await fakeIncomeDistributionRepository.create({
      user_id: user.id,
      month: 8,
      year: 2020,
      description: 'Despesas fixas mensais',
      percentage: 50,
      value: 3000,
      accomplished_value: 0,
    });

    const expenseValue = await createExpenseValueService.execute({
      expense_id: expenseList.id,
      name: 'Aluguel',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    expect(expenseValue).toBeDefined();
    expect(expenseValue.name).toEqual('Aluguel');
    expect(expenseValue.value).toEqual(1000);
  });
});
