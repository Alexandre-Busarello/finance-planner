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

@Entity('plans')
class Plan {
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
  objective_value: number;

  @Column({
    type: 'double precision',
    transformer: new ColumnNumericTransformer(),
  })
  accomplished_value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Plan;
