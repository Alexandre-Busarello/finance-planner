import ICreateExpenseDTO from '@modules/allocation/dtos/ICreateExpenseDTO';
import ICreateExpenseValueDTO from '@modules/allocation/dtos/ICreateExpenseValueDTO';
import Expense from '@modules/allocation/infra/typeorm/entities/Expense';
import ExpenseValue from '@modules/allocation/infra/typeorm/entities/ExpenseValue';

export default interface IExpenseRepository {
  create(data: ICreateExpenseDTO): Promise<Expense>;
  getAllUserExpenses(user_id: string): Promise<Expense[]>;

  getAllValuesBySameOrigin(origin_id: string): Promise<ExpenseValue[]>;
  createValue(data: ICreateExpenseValueDTO): Promise<ExpenseValue>;
}
