import AppError from '@shared/errors/AppError';
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
      fakeIncomeDistributionRepository,
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

  it('should not be able to create an expense value if origin income doesnt exists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const expenseList = await fakeExpenseRepository.create({
      name: 'Expenses',
      user_id: user.id,
    });

    await expect(
      createExpenseValueService.execute({
        expense_id: expenseList.id,
        name: 'Aluguel',
        value: 1000,
        origin_id: 'non-exists-origin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an expense value with exceeds the income origin', async () => {
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

    await createExpenseValueService.execute({
      expense_id: expenseList.id,
      name: 'Aluguel',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    await expect(
      createExpenseValueService.execute({
        expense_id: expenseList.id,
        name: 'Aluguel 2',
        value: 3000,
        origin_id: incomeDistribution.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create an expense value and the income origin need be updated with accomplished value', async () => {
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

    await createExpenseValueService.execute({
      expense_id: expenseList.id,
      name: 'Aluguel',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    await createExpenseValueService.execute({
      expense_id: expenseList.id,
      name: 'Aluguel',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    const updatedIncome = await fakeIncomeDistributionRepository.getById(
      incomeDistribution.id,
    );

    expect(updatedIncome?.accomplished_value).toEqual(2000);
  });
});
