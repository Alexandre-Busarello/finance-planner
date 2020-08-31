import AppError from '@shared/errors/AppError';
import FakeIncomeDistributionRepository from '@modules/incomes/repositories/IncomeDistribution/fakes/FakeIncomeDistributionRepository';

import FakeMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/fakes/FakeMonthlyIncomeRepository';
import UpdateIncomesDistributionService from './UpdateIncomesDistributionService';

let fakeIncomeDistributionRepository: FakeIncomeDistributionRepository;
let fakeMonthlyIncomeRepository: FakeMonthlyIncomeRepository;
let updateIncomesDistributionService: UpdateIncomesDistributionService;

describe('UpdateIncomesDistribution', () => {
  beforeEach(() => {
    fakeIncomeDistributionRepository = new FakeIncomeDistributionRepository();
    fakeMonthlyIncomeRepository = new FakeMonthlyIncomeRepository();
    updateIncomesDistributionService = new UpdateIncomesDistributionService(
      fakeIncomeDistributionRepository,
      fakeMonthlyIncomeRepository,
    );
  });

  it('should be able to update the incomes distribution', async () => {
    await fakeMonthlyIncomeRepository.create({
      user_id: 'user-1',
      month: 8,
      year: 2020,
      value: 6000,
    });

    const distribution1 = await fakeIncomeDistributionRepository.create({
      user_id: 'user-1',
      month: 8,
      year: 2020,
      description: 'Despesas fixas (aluguel, luz e etc)',
      percentage: 50,
      value: 3000,
      accomplished_value: 0,
    });

    const distribution2 = await fakeIncomeDistributionRepository.create({
      user_id: 'user-1',
      month: 8,
      year: 2020,
      description: 'Investimentos',
      percentage: 50,
      value: 3000,
      accomplished_value: 0,
    });

    await updateIncomesDistributionService.execute([
      {
        id: distribution1.id,
        percentage: 60,
      },
      {
        id: distribution2.id,
        percentage: 40,
      },
    ]);

    const incomeDistribution = await fakeIncomeDistributionRepository.getAll({
      user_id: 'user-1',
      month: 8,
      year: 2020,
    });

    expect(incomeDistribution.length).toBe(2);
    expect(incomeDistribution[0].percentage).toEqual(60);
    expect(incomeDistribution[0].value).toEqual(3600);

    expect(incomeDistribution[1].percentage).toEqual(40);
    expect(incomeDistribution[1].value).toEqual(2400);
  });

  it('should not be able to update the incomes distribution with percentage sum is not 100', async () => {
    const distribution1 = await fakeIncomeDistributionRepository.create({
      user_id: 'user-1',
      month: 8,
      year: 2020,
      description: 'Despesas fixas (aluguel, luz e etc)',
      percentage: 50,
      value: 3000,
      accomplished_value: 0,
    });

    const distribution2 = await fakeIncomeDistributionRepository.create({
      user_id: 'user-1',
      month: 8,
      year: 2020,
      description: 'Investimentos',
      percentage: 50,
      value: 3000,
      accomplished_value: 0,
    });

    await expect(
      updateIncomesDistributionService.execute([
        {
          id: distribution1.id,
          percentage: 60,
        },
        {
          id: distribution2.id,
          percentage: 60,
        },
      ]),
    ).rejects.toBeInstanceOf(AppError);
  });
});
