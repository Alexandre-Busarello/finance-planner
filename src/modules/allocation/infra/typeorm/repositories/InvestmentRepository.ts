import { Repository, getRepository } from 'typeorm';
import IInvestmentRepository from '@modules/allocation/repositories/Investment/IInvestmentRepository';
import ICreateInvestmentValueDTO from '@modules/allocation/dtos/ICreateInvestmentValueDTO';
import ICreateInvestmentDTO from '@modules/allocation/dtos/ICreateInvestmentDTO';
import InvestmentValue from '../entities/InvestmentValue';
import Investment from '../entities/Investment';

class InvestmentRepository implements IInvestmentRepository {
  private ormInvestmentRepository: Repository<Investment>;

  private ormInvestmentValueRepository: Repository<InvestmentValue>;

  constructor() {
    this.ormInvestmentRepository = getRepository(Investment);
    this.ormInvestmentValueRepository = getRepository(InvestmentValue);
  }

  async getAllValuesBySameOrigin(
    origin_id: string,
  ): Promise<InvestmentValue[]> {
    return this.ormInvestmentValueRepository.find({ where: { origin_id } });
  }

  async create({ name, user_id }: ICreateInvestmentDTO): Promise<Investment> {
    const expense = this.ormInvestmentRepository.create({
      user_id,
      name,
    });

    await this.ormInvestmentRepository.save(expense);

    return expense;
  }

  async createValue({
    investment_id,
    origin_id,
    name,
    value,
  }: ICreateInvestmentValueDTO): Promise<InvestmentValue> {
    const expenseValue = this.ormInvestmentValueRepository.create({
      investment_id,
      origin_id,
      name,
      value,
    });

    await this.ormInvestmentValueRepository.save(expenseValue);

    return expenseValue;
  }
}

export default InvestmentRepository;
