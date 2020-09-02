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

  it('should be able to create an investment list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const investment = await createInvestmentListService.execute({
      user_id: user.id,
      name: 'Investments',
      objective_percentage: 50,
      is_dollar: false,
    });

    expect(investment).toBeDefined();
    expect(investment.name).toEqual('Investments');
    expect(investment.objective_percentage).toEqual(50);
    expect(investment.is_dollar).toEqual(false);
  });

  it('should not be able to create a new investment list with reached the objective limit of 100%', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    await createInvestmentListService.execute({
      user_id: user.id,
      name: 'Ações Brasil',
      objective_percentage: 50,
      is_dollar: false,
    });

    await expect(
      createInvestmentListService.execute({
        user_id: user.id,
        name: 'Ações Americanas',
        objective_percentage: 60,
        is_dollar: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an investment list if user doesnt exists', async () => {
    await expect(
      createInvestmentListService.execute({
        user_id: 'non-existing user',
        name: 'Investments',
        objective_percentage: 50,
        is_dollar: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
