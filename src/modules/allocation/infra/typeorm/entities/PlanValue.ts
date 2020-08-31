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
import Plan from './Plan';

@Entity('plan_values')
class PlanValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  plan_id: string;

  @ManyToOne(() => Plan)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

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

export default PlanValue;
