import FakeMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/fakes/FakeMonthlyIncomeRepository';
import ListMonthlyIncomeService from './ListMonthlyIncomeService';

let fakeMonthlyIncomeRepository: FakeMonthlyIncomeRepository;
let listMonthlyIncomeService: ListMonthlyIncomeService;

describe('ListMonthlyIncome', () => {
  beforeEach(() => {
    fakeMonthlyIncomeRepository = new FakeMonthlyIncomeRepository();
    listMonthlyIncomeService = new ListMonthlyIncomeService(
      fakeMonthlyIncomeRepository,
    );
  });

  it('should be able to list all user monthly income', async () => {
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
      value: 1020,
    });

    const monthlyIncomes = await listMonthlyIncomeService.execute({
      user_id: 'user-1',
    });

    const totalValue = monthlyIncomes.reduce((sum, income) => {
      return sum + income.value;
    }, 0);

    expect(monthlyIncomes.length).toBe(3);
    expect(totalValue).toEqual(3060);
  });

  it('should be returns a empty list if monthly incomes doesnt exists', async () => {
    const settings = await listMonthlyIncomeService.execute({
      user_id: 'user-1',
    });

    expect(settings.length).toBe(0);
  });
});
