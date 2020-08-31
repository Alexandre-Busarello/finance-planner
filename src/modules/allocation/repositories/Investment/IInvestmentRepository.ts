import ICreateInvestmentDTO from '@modules/allocation/dtos/ICreateInvestmentDTO';
import ICreateInvestmentValueDTO from '@modules/allocation/dtos/ICreateInvestmentValueDTO';
import Investment from '@modules/allocation/infra/typeorm/entities/Investment';
import InvestmentValue from '@modules/allocation/infra/typeorm/entities/InvestmentValue';

export default interface IInvestmentRepository {
  create(data: ICreateInvestmentDTO): Promise<Investment>;
  createValue(data: ICreateInvestmentValueDTO): Promise<InvestmentValue>;
}
