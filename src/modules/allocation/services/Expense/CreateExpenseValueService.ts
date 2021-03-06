import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IIncomeDistributionRepository from '@modules/incomes/repositories/IncomeDistribution/IIncomeDistribution';
import IExpenseRepository from '@modules/allocation/repositories/Expense/IExpenseRepository';
import ExpenseValue from '@modules/allocation/infra/typeorm/entities/ExpenseValue';

interface IRequest {
  expense_id: string;
  name: string;
  value: number;
  origin_id: string;
}

// Regra 1 - Não permitir ultrapassar o valor total da origem
// Regra 2 - Atualizar o campo da tabela income_distribution para consumir o crédito

@injectable()
class CreateExpenseValueService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
    @inject('IncomeDistributionRepository')
    private incomeDistributionRepository: IIncomeDistributionRepository,
  ) {}

  public async execute({
    expense_id,
    name,
    origin_id,
    value,
  }: IRequest): Promise<ExpenseValue> {
    const originIncome = await this.incomeDistributionRepository.getById(
      origin_id,
    );

    if (!originIncome) {
      throw new AppError('The origin income distribution not found');
    }

    if (value > originIncome.value - originIncome.accomplished_value) {
      throw new AppError('The origin income distribution is been reached');
    }

    const expenseValue = await this.expenseRepository.createValue({
      expense_id,
      name,
      origin_id,
      value,
    });

    originIncome.accomplished_value += value;

    await this.incomeDistributionRepository.saveAll([originIncome]);

    return expenseValue;
  }
}

export default CreateExpenseValueService;
