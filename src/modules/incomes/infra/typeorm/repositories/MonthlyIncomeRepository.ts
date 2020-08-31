import { Repository, getRepository } from 'typeorm';

import IMonthlyIncomeRepository from '@modules/incomes/repositories/MonthlyIncome/IMonthlyIncomeRepository';
import ICreateMonthlyIncomeDTO from '@modules/incomes/dtos/ICreateMonthlyIncomeDTO';
import MonthlyIncome from '../entities/MonthlyIncome';

class MonthlyIncomeRepository implements IMonthlyIncomeRepository {
  private ormRepository: Repository<MonthlyIncome>;

  constructor() {
    this.ormRepository = getRepository(MonthlyIncome);
  }

  async findById(id: string): Promise<MonthlyIncome | undefined> {
    const monthlyIncome = await this.ormRepository.findOne(id);
    return monthlyIncome;
  }

  async findByUser(userId: string): Promise<MonthlyIncome[]> {
    const monthlyIncomeList = this.ormRepository.find({
      where: {
        user_id: userId,
      },
    });
    return monthlyIncomeList;
  }

  async findByUserAndYear(
    userId: string,
    year: number,
  ): Promise<MonthlyIncome[]> {
    const monthlyIncomeList = this.ormRepository.find({
      where: {
        user_id: userId,
        year,
      },
    });
    return monthlyIncomeList;
  }

  async findByUserAndMonthAndYear(
    userId: string,
    month: number,
    year: number,
  ): Promise<MonthlyIncome[]> {
    const monthlyIncomeList = this.ormRepository.find({
      where: {
        user_id: userId,
        year,
        month,
      },
    });

    return monthlyIncomeList;
  }

  async create({
    user_id,
    year,
    month,
    value,
  }: ICreateMonthlyIncomeDTO): Promise<MonthlyIncome> {
    const monthlyIncome = this.ormRepository.create({
      user_id,
      year,
      month,
      value,
    });

    this.ormRepository.save(monthlyIncome);

    return monthlyIncome;
  }

  public async save(monthlyIncome: MonthlyIncome): Promise<MonthlyIncome> {
    this.ormRepository.save(monthlyIncome);

    return monthlyIncome;
  }
}

export default MonthlyIncomeRepository;
