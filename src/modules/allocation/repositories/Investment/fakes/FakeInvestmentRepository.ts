import { uuid } from 'uuidv4';

import Investment from '@modules/allocation/infra/typeorm/entities/Investment';
import InvestmentValue from '@modules/allocation/infra/typeorm/entities/InvestmentValue';
import ICreateInvestmentDTO from '@modules/allocation/dtos/ICreateInvestmentDTO';
import ICreateInvestmentValueDTO from '@modules/allocation/dtos/ICreateInvestmentValueDTO';
import IInvestmentRepository from '../IInvestmentRepository';

class FakeInvestmentRepository implements IInvestmentRepository {
  private investments: Investment[] = [];

  private investmentValues: InvestmentValue[] = [];

  async getAllValuesBySameOrigin(
    origin_id: string,
  ): Promise<InvestmentValue[]> {
    return this.investmentValues.filter(
      investment => investment.origin_id === origin_id,
    );
  }

  async getAllUserInvestments(user_id: string): Promise<Investment[]> {
    return this.investments.filter(
      investment => investment.user_id === user_id,
    );
  }

  async create(data: ICreateInvestmentDTO): Promise<Investment> {
    const investment = new Investment();

    Object.assign(investment, { id: uuid() }, data);
    this.investments.push(investment);

    return investment;
  }

  async createValue(data: ICreateInvestmentValueDTO): Promise<InvestmentValue> {
    const value = new InvestmentValue();

    Object.assign(value, { id: uuid() }, data);
    this.investmentValues.push(value);

    return value;
  }
}

export default FakeInvestmentRepository;
