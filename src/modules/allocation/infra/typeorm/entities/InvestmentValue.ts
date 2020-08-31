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
import Investment from './Investment';

@Entity('investment_values')
class InvestmentValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  investment_id: string;

  @ManyToOne(() => Investment)
  @JoinColumn({ name: 'investment_id' })
  investment: Investment;

  @Column()
  name: string;

  @Column({
    type: 'decimal',
  })
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

export default InvestmentValue;
