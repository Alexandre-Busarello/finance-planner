import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeExpenseRepository from '@modules/allocation/repositories/Expense/fakes/FakeExpenseRepository';
import CreateExpenseListService from './CreateExpenseListService';

let fakeUsersRepository: FakeUsersRepository;
let fakeExpenseRepository: FakeExpenseRepository;
let createExpenseListService: CreateExpenseListService;

describe('CreateExpenseListService.', () => {
  beforeEach(() => {
    fakeExpenseRepository = new FakeExpenseRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createExpenseListService = new CreateExpenseListService(
      fakeExpenseRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create an expense list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const expense = await createExpenseListService.execute({
      user_id: user.id,
      name: 'Expenses',
    });

    expect(expense).toBeDefined();
    expect(expense.name).toEqual('Expenses');
  });

  it('should not be able to create an expense list if user doesnt exists', async () => {
    await expect(
      createExpenseListService.execute({
        user_id: 'non-existing user',
        name: 'Expenses',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
