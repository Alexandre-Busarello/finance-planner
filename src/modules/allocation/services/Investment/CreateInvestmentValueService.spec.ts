import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeIncomeDistributionRepository from '@modules/incomes/repositories/IncomeDistribution/fakes/FakeIncomeDistributionRepository';
import FakeInvestmentRepository from '@modules/allocation/repositories/Investment/fakes/FakeInvestmentRepository';
import CreateInvestmentValueService from './CreateInvestmentValueService';

let fakeUsersRepository: FakeUsersRepository;
let fakeInvestmentRepository: FakeInvestmentRepository;
let fakeIncomeDistributionRepository: FakeIncomeDistributionRepository;
let createInvestmentValueService: CreateInvestmentValueService;

describe('CreateInvestmentValueService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeInvestmentRepository = new FakeInvestmentRepository();
    fakeIncomeDistributionRepository = new FakeIncomeDistributionRepository();
    createInvestmentValueService = new CreateInvestmentValueService(
      fakeInvestmentRepository,
      fakeIncomeDistributionRepository,
    );
  });

  it('should be able to create an investment value to one investment list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const investmentList = await fakeInvestmentRepository.create({
      name: 'Investments',
      user_id: user.id,
      objective_percentage: 50,
      is_dollar: false,
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

    const investmentValue = await createInvestmentValueService.execute({
      investment_id: investmentList.id,
      name: 'WEGE3',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    expect(investmentValue).toBeDefined();
    expect(investmentValue.name).toEqual('WEGE3');
    expect(investmentValue.value).toEqual(1000);
  });

  it('should not be able to create an investment value if origin income doesnt exists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const investmentList = await fakeInvestmentRepository.create({
      name: 'Investments',
      user_id: user.id,
      objective_percentage: 50,
      is_dollar: false,
    });

    await expect(
      createInvestmentValueService.execute({
        investment_id: investmentList.id,
        name: 'IBOV',
        value: 1000,
        origin_id: 'non-exists-origin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an investment value with exceeds the income origin', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const investmentList = await fakeInvestmentRepository.create({
      name: 'Investments',
      user_id: user.id,
      objective_percentage: 50,
      is_dollar: false,
    });

    const incomeDistribution = await fakeIncomeDistributionRepository.create({
      user_id: user.id,
      month: 8,
      year: 2020,
      description: 'Independencia financeira',
      percentage: 50,
      value: 3000,
      accomplished_value: 0,
    });

    await createInvestmentValueService.execute({
      investment_id: investmentList.id,
      name: 'IBOV',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    await expect(
      createInvestmentValueService.execute({
        investment_id: investmentList.id,
        name: 'USA',
        value: 3000,
        origin_id: incomeDistribution.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create an investment value and the income origin need be updated with accomplished value', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const investmentList = await fakeInvestmentRepository.create({
      name: 'Investments',
      user_id: user.id,
      objective_percentage: 50,
      is_dollar: false,
    });

    const incomeDistribution = await fakeIncomeDistributionRepository.create({
      user_id: user.id,
      month: 8,
      year: 2020,
      description: 'Independencia financeira',
      percentage: 50,
      value: 3000,
      accomplished_value: 0,
    });

    await createInvestmentValueService.execute({
      investment_id: investmentList.id,
      name: 'IBOV',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    await createInvestmentValueService.execute({
      investment_id: investmentList.id,
      name: 'USA',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    const updatedIncome = await fakeIncomeDistributionRepository.getById(
      incomeDistribution.id,
    );

    expect(updatedIncome?.accomplished_value).toEqual(2000);
  });
});
