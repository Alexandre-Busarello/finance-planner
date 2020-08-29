import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/fakes/FakeMonthlyIncomeRepository';
import CreateMonthlyIncomeService from './CreateMonthlyIncomeService';

let fakeMonthlyIncomeRepository: FakeMonthlyIncomeRepository;
let fakeUsersRepository: FakeUsersRepository;
let createMonthlyIncomeService: CreateMonthlyIncomeService;

describe('CreateMonthlyIncome', () => {
  beforeEach(() => {
    fakeMonthlyIncomeRepository = new FakeMonthlyIncomeRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createMonthlyIncomeService = new CreateMonthlyIncomeService(
      fakeMonthlyIncomeRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create one monthly income', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const monthlyIncome = await createMonthlyIncomeService.execute({
      user_id: user.id,
      month: 5,
      year: 2020,
      value: 8457.61,
    });

    expect(monthlyIncome).toBeDefined();
    expect(monthlyIncome.month).toEqual(5);
    expect(monthlyIncome.year).toEqual(2020);
    expect(monthlyIncome.value).toEqual(8457.61);
  });

  it('should not be able to create a monthly income if user doesnt exists', async () => {
    await expect(
      createMonthlyIncomeService.execute({
        user_id: 'non-existing user',
        month: 5,
        year: 2020,
        value: 8457.61,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a monthly income for a invalid month', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    await expect(
      createMonthlyIncomeService.execute({
        user_id: user.id,
        month: 13,
        year: 2020,
        value: 8457.61,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createMonthlyIncomeService.execute({
        user_id: user.id,
        month: 0,
        year: 2020,
        value: 8457.61,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
