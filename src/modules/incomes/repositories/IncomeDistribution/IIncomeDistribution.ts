import ICreateIncomeDistributionDTO from '@modules/incomes/dtos/ICreateIncomeDistributionDTO';
import IncomeDistribution from '@modules/incomes/infra/typeorm/entities/IncomeDistribution';
import IGetAllIncomeDistributionDTO from '@modules/incomes/dtos/IGetAllIncomeDistributionDTO';
import IDeleteIncomeDistributionDTO from '@modules/incomes/dtos/IDeleteIncomeDistributionDTO';
import IIncomeDistributionGroupedByYearDTO from '@modules/incomes/dtos/IIncomeDistributionGroupedByYearDTO';

export default interface IIncomeDistribution {
  getById(id: string): Promise<IncomeDistribution | undefined>;
  getGroupedByYear(
    user_id: string,
    year: number,
  ): Promise<IIncomeDistributionGroupedByYearDTO[]>;
  getTotalValue(user_id: string): Promise<number>;
  getAll(data: IGetAllIncomeDistributionDTO): Promise<IncomeDistribution[]>;
  create(data: ICreateIncomeDistributionDTO): Promise<IncomeDistribution>;
  saveAll(incomes: IncomeDistribution[]): Promise<IncomeDistribution[]>;
  delete(data: IDeleteIncomeDistributionDTO): Promise<void>;
}
