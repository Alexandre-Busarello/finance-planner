import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeIncomeDistributionRepository from '@modules/incomes/repositories/IncomeDistribution/fakes/FakeIncomeDistributionRepository';
import FakePlanRepository from '@modules/allocation/repositories/Plan/fakes/FakePlanRepository';
import CreatePlanValueService from './CreatePlanValueService';

let fakeUsersRepository: FakeUsersRepository;
let fakePlanRepository: FakePlanRepository;
let fakeIncomeDistributionRepository: FakeIncomeDistributionRepository;
let createPlanValueService: CreatePlanValueService;

describe('CreatePlanValueService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePlanRepository = new FakePlanRepository();
    fakeIncomeDistributionRepository = new FakeIncomeDistributionRepository();
    createPlanValueService = new CreatePlanValueService(
      fakePlanRepository,
      fakeIncomeDistributionRepository,
    );
  });

  it('should be able to create a plan value to one plan list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const planList = await fakePlanRepository.create({
      name: 'Car',
      user_id: user.id,
    });

    const incomeDistribution = await fakeIncomeDistributionRepository.create({
      user_id: user.id,
      month: 8,
      year: 2020,
      description: 'Card',
      percentage: 50,
      value: 3000,
      accomplished_value: 0,
    });

    const planValue = await createPlanValueService.execute({
      plan_id: planList.id,
      name: 'Aporte',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    expect(planValue).toBeDefined();
    expect(planValue.name).toEqual('Aporte');
    expect(planValue.value).toEqual(1000);
  });

  it('should not be able to create a plan value if origin income doesnt exists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const planList = await fakePlanRepository.create({
      name: 'Car',
      user_id: user.id,
    });

    await expect(
      createPlanValueService.execute({
        plan_id: planList.id,
        name: 'IBOV',
        value: 1000,
        origin_id: 'non-exists-origin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a plan value with exceeds the income origin', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const planList = await fakePlanRepository.create({
      name: 'Car',
      user_id: user.id,
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

    await createPlanValueService.execute({
      plan_id: planList.id,
      name: 'Aporte 1',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    await expect(
      createPlanValueService.execute({
        plan_id: planList.id,
        name: 'Aporte 2',
        value: 3000,
        origin_id: incomeDistribution.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a plan value and the income origin need be updated with accomplished value', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const planList = await fakePlanRepository.create({
      name: 'Car',
      user_id: user.id,
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

    await createPlanValueService.execute({
      plan_id: planList.id,
      name: 'Aporte 1',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    await createPlanValueService.execute({
      plan_id: planList.id,
      name: 'Aporte 2',
      value: 1000,
      origin_id: incomeDistribution.id,
    });

    const updatedIncome = await fakeIncomeDistributionRepository.getById(
      incomeDistribution.id,
    );

    expect(updatedIncome?.accomplished_value).toEqual(2000);
  });
});
