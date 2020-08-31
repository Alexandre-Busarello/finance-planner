import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import IncomeDistribution from '@modules/incomes/infra/typeorm/entities/IncomeDistribution';
import Expense from './Expense';

@Entity('expense_values')
class ExpenseValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expense_id: string;

  @ManyToOne(() => Expense)
  @JoinColumn({ name: 'expense_id' })
  expense: Expense;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column()
  origin_id: string;

  @ManyToOne(() => IncomeDistribution)
  @JoinColumn({ name: 'origin_id' })
  origin: IncomeDistribution;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ExpenseValue;
