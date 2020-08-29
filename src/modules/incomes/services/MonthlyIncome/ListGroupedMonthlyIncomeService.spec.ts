import FakeMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/fakes/FakeMonthlyIncomeRepository';
import ListGroupedMonthlyIncomeService from './ListGroupedMonthlyIncomeService';

let fakeMonthlyIncomeRepository: FakeMonthlyIncomeRepository;
let listGroupedMonthlyIncomeService: ListGroupedMonthlyIncomeService;

describe('ListGroupedMonthlyIncome', () => {
  beforeEach(() => {
    fakeMonthlyIncomeRepository = new FakeMonthlyIncomeRepository();
    listGroupedMonthlyIncomeService = new ListGroupedMonthlyIncomeService(
      fakeMonthlyIncomeRepository,
    );
  });

  it('should be able to list all user monthly income grouped', async () => {
    await fakeMonthlyIncomeRepository.create({
      user_id: 'user-1',
      month: 5,
      year: 2020,
      value: 1020,
    });

    await fakeMonthlyIncomeRepository.create({
      user_id: 'user-1',
      month: 5,
      year: 2020,
      value: 1020,
    });

    await fakeMonthlyIncomeRepository.create({
      user_id: 'user-1',
      month: 6,
      year: 2020,
      value: 350,
    });

    await fakeMonthlyIncomeRepository.create({
      user_id: 'user-1',
      month: 6,
      year: 2020,
      value: 400,
    });

    await fakeMonthlyIncomeRepository.create({
      user_id: 'user-1',
      month: 6,
      year: 2020,
      value: 100,
    });

    await fakeMonthlyIncomeRepository.create({
      user_id: 'user-1',
      month: 6,
      year: 2019,
      value: 100,
    });

    const monthlyIncomes = await listGroupedMonthlyIncomeService.execute({
      user_id: 'user-1',
      year: 2020,
    });

    expect(monthlyIncomes).toEqual(
      expect.arrayContaining([
        { month: 4, year: 2020, value: 0 },
        { month: 5, year: 2020, value: 2040 },
        { month: 6, year: 2020, value: 850 },
        { month: 7, year: 2020, value: 0 },
      ]),
    );
  });

  it('should be returns the twelve months with zero value if doesnt exists monthly incomes', async () => {
    const monthlyIncomes = await listGroupedMonthlyIncomeService.execute({
      user_id: 'user-1',
      year: 2020,
    });

    expect(monthlyIncomes).toEqual(
      expect.arrayContaining([
        { month: 1, year: 2020, value: 0 },
        { month: 2, year: 2020, value: 0 },
        { month: 3, year: 2020, value: 0 },
        { month: 4, year: 2020, value: 0 },
        { month: 5, year: 2020, value: 0 },
        { month: 6, year: 2020, value: 0 },
        { month: 7, year: 2020, value: 0 },
        { month: 8, year: 2020, value: 0 },
        { month: 9, year: 2020, value: 0 },
        { month: 10, year: 2020, value: 0 },
        { month: 11, year: 2020, value: 0 },
        { month: 12, year: 2020, value: 0 },
      ]),
    );
  });
});
