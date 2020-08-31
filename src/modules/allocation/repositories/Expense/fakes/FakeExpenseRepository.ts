import { uuid } from 'uuidv4';

import ICreateExpenseDTO from '@modules/allocation/dtos/ICreateExpenseDTO';
import Expense from '@modules/allocation/infra/typeorm/entities/Expense';
import ICreateExpenseValueDTO from '@modules/allocation/dtos/ICreateExpenseValueDTO';
import ExpenseValue from '@modules/allocation/infra/typeorm/entities/ExpenseValue';
import IExpenseRepository from '../IExpenseRepository';

class FakeExpenseRepository implements IExpenseRepository {
  private expenses: Expense[] = [];

  private expenseValues: ExpenseValue[] = [];

  async create(data: ICreateExpenseDTO): Promise<Expense> {
    const expense = new Expense();

    Object.assign(expense, { id: uuid() }, data);
    this.expenses.push(expense);

    return expense;
  }

  async createValue(data: ICreateExpenseValueDTO): Promise<ExpenseValue> {
    const value = new ExpenseValue();

    Object.assign(value, { id: uuid() }, data);
    this.expenseValues.push(value);

    return value;
  }
}

export default FakeExpenseRepository;
