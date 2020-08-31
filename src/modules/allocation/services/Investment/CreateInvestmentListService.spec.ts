import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeInvestmentRepository from '@modules/allocation/repositories/Investment/fakes/FakeInvestmentRepository';
import CreateInvestmentListService from './CreateInvestmentListService';

let fakeUsersRepository: FakeUsersRepository;
let fakeInvestmentRepository: FakeInvestmentRepository;
let createInvestmentListService: CreateInvestmentListService;

describe('CreateInvestmentListService', () => {
  beforeEach(() => {
    fakeInvestmentRepository = new FakeInvestmentRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createInvestmentListService = new CreateInvestmentListService(
      fakeInvestmentRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create an expense list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const expense = await createInvestmentListService.execute({
      user_id: user.id,
      name: 'Investments',
    });

    expect(expense).toBeDefined();
    expect(expense.name).toEqual('Investments');
  });

  it('should not be able to create an expense list if user doesnt exists', async () => {
    await expect(
      createInvestmentListService.execute({
        user_id: 'non-existing user',
        name: 'Investments',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
