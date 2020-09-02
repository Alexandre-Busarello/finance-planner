import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import ColumnNumericTransformer from '@shared/infra/typeorm/transforms/ColumnNumericTransformer';
import Investment from '@modules/allocation/infra/typeorm/entities/Investment';

@Entity('investment_quotations')
class InvestmentQuotation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  investment_id: string;

  @ManyToOne(() => Investment)
  @JoinColumn({ name: 'investment_id' })
  user: Investment;

  @Column()
  date: Date;

  @Column({
    type: 'double precision',
    transformer: new ColumnNumericTransformer(),
  })
  quotation_value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default InvestmentQuotation;
