import ICreateIncomeDistributionDTO from '@modules/incomes/dtos/ICreateIncomeDistributionDTO';
import IncomeDistribution from '@modules/incomes/infra/typeorm/entities/IncomeDistribution';
import IGetAllIncomeDistributionDTO from '@modules/incomes/dtos/IGetAllIncomeDistributionDTO';
import IDeleteIncomeDistributionDTO from '@modules/incomes/dtos/IDeleteIncomeDistributionDTO';

export default interface IIncomeDistribution {
  getAll(data: IGetAllIncomeDistributionDTO): Promise<IncomeDistribution[]>;
  create(data: ICreateIncomeDistributionDTO): Promise<IncomeDistribution>;
  save(user: IncomeDistribution): Promise<IncomeDistribution>;
  delete(data: IDeleteIncomeDistributionDTO): Promise<void>;
}
