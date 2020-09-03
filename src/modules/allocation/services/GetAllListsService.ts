import { injectable, inject } from 'tsyringe';

import IGetAllListsDTO from '../dtos/IGetAllListsDTO';
import IInvestmentRepository from '../repositories/Investment/IInvestmentRepository';
import IExpenseRepository from '../repositories/Expense/IExpenseRepository';
import IPlanRepository from '../repositories/Plan/IPlanRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class GetAllListsService {
  constructor(
    @inject('InvestmentRepository')
    private investmentRepository: IInvestmentRepository,
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
    @inject('PlanRepository')
    private planRepository: IPlanRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IGetAllListsDTO[]> {
    const investments = this.investmentRepository.getAllUserInvestments(
      user_id,
    );

    const expenses = this.expenseRepository.getAllUserExpenses(user_id);

    const plans = this.planRepository.getAllUserPlans(user_id);

    const lists: IGetAllListsDTO[] = [];

    const finalLists = lists.concat(
      (await investments).map<IGetAllListsDTO>(investment => {
        return {
          id: investment.id,
          name: investment.name,
          type: 'investment',
        };
      }),
      (await expenses).map<IGetAllListsDTO>(expense => {
        return {
          id: expense.id,
          name: expense.name,
          type: 'expense',
        };
      }),
      (await plans).map<IGetAllListsDTO>(plan => {
        return {
          id: plan.id,
          name: plan.name,
          type: 'plan',
        };
      }),
    );

    return finalLists;
  }
}

export default GetAllListsService;
