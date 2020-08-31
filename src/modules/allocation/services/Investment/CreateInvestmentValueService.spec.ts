// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeIncomeDistributionRepository from '@modules/incomes/repositories/IncomeDistribution/fakes/FakeIncomeDistributionRepository';
import FakeInvestmentRepository from '@modules/allocation/repositories/Investment/fakes/FakeInvestmentRepository';
import CreateInvestmentValueService from './CreateInvestmentValueService';

let fakeUsersRepository: FakeUsersRepository;
let fakeInvestmentRepository: FakeInvestmentRepository;
let fakeIncomeDistributionRepository: FakeIncomeDistributionRepository;
let createExpenseValueService: CreateInvestmentValueService;

describe('CreateInvestmentValueService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeInvestmentRepository = new FakeInvestmentRepository();
    fakeIncomeDistributionRepository = new FakeIncomeDistributionRepository();
    createExpenseValueService = new CreateInvestmentValueService(
      fakeInvestmentRepository,
    );
  });

  it('should be able to create an expense value to one expense list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const investmentList = await fakeInvestmentRepository.create({
      name: 'Investments',
      user_id: user.id,
    });

    const incomeDistribution = await fakeIncomeDistributionRepository.create({
      user_id: user.id,
      month: 8,
      year: 2020,
      description: 'Stocks Brazil',
      percentage: 50,
      value: 3000,
      accomplished_value: 0,
    });

    const investmentValue = await createExpenseValueService.execute({
      investment_id: investmentList.id,
      name: 'WEGE3',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    expect(investmentValue).toBeDefined();
    expect(investmentValue.name).toEqual('WEGE3');
    expect(investmentValue.value).toEqual(1000);
  });
});
