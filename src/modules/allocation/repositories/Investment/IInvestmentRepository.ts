import ICreateInvestmentDTO from '@modules/allocation/dtos/ICreateInvestmentDTO';
import ICreateInvestmentValueDTO from '@modules/allocation/dtos/ICreateInvestmentValueDTO';
import Investment from '@modules/allocation/infra/typeorm/entities/Investment';
import InvestmentValue from '@modules/allocation/infra/typeorm/entities/InvestmentValue';

export default interface IInvestmentRepository {
  create(data: ICreateInvestmentDTO): Promise<Investment>;
  getAllUserInvestments(user_id: string): Promise<Investment[]>;

  getAllValuesBySameOrigin(origin_id: string): Promise<InvestmentValue[]>;
  createValue(data: ICreateInvestmentValueDTO): Promise<InvestmentValue>;
}
