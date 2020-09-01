import ICreateExpenseDTO from '@modules/allocation/dtos/ICreateExpenseDTO';
import Expense from '@modules/allocation/infra/typeorm/entities/Expense';
import ICreateExpenseValueDTO from '@modules/allocation/dtos/ICreateExpenseValueDTO';
import ExpenseValue from '@modules/allocation/infra/typeorm/entities/ExpenseValue';
import { Repository, getRepository } from 'typeorm';
import IExpenseRepository from '@modules/allocation/repositories/Expense/IExpenseRepository';

class ExpenseRepository implements IExpenseRepository {
  private ormExpenseRepository: Repository<Expense>;

  private ormExpenseValueRepository: Repository<ExpenseValue>;

  constructor() {
    this.ormExpenseRepository = getRepository(Expense);
    this.ormExpenseValueRepository = getRepository(ExpenseValue);
  }

  async getAllValuesBySameOrigin(origin_id: string): Promise<ExpenseValue[]> {
    return this.ormExpenseValueRepository.find({ where: { origin_id } });
  }

  async create({ name, user_id }: ICreateExpenseDTO): Promise<Expense> {
    const expense = this.ormExpenseRepository.create({
      user_id,
      name,
    });

    await this.ormExpenseRepository.save(expense);

    return expense;
  }

  async createValue({
    expense_id,
    origin_id,
    name,
    value,
  }: ICreateExpenseValueDTO): Promise<ExpenseValue> {
    const expenseValue = this.ormExpenseValueRepository.create({
      expense_id,
      origin_id,
      name,
      value,
    });

    await this.ormExpenseValueRepository.save(expenseValue);

    return expenseValue;
  }
}

export default ExpenseRepository;
