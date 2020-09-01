import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import ColumnNumericTransformer from '@shared/infra/typeorm/transforms/ColumnNumericTransformer';

@Entity('income_distribution')
class IncomeDistribution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column({
    type: 'double precision',
    transformer: new ColumnNumericTransformer(),
  })
  percentage: number;

  @Column({
    type: 'double precision',
    transformer: new ColumnNumericTransformer(),
  })
  value: number;

  @Column({
    type: 'double precision',
    transformer: new ColumnNumericTransformer(),
  })
  accomplished_value: number;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default IncomeDistribution;
