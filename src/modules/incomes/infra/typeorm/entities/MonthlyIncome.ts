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

@Entity('monthly_income')
class MonthlyIncome {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column({
    precision: 5,
    scale: 2,
  })
  value: number;

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

export default MonthlyIncome;
