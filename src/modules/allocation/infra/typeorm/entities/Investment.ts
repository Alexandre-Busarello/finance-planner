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

@Entity('investments')
class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column({
    type: 'double precision',
    transformer: new ColumnNumericTransformer(),
    default: 0,
  })
  objective_percentage: number;

  @Column({
    default: false,
  })
  is_dollar: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Investment;
