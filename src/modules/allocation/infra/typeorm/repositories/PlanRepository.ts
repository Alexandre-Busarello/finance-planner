import { Repository, getRepository } from 'typeorm';
import IPlanRepository from '@modules/allocation/repositories/Plan/IPlanRepository';
import ICreatePlanValueDTO from '@modules/allocation/dtos/ICreatePlanValueDTO';
import ICreatePlanDTO from '@modules/allocation/dtos/ICreatePlanDTO';
import Plan from '../entities/Plan';
import PlanValue from '../entities/PlanValue';

class PlanRepository implements IPlanRepository {
  private ormPlanRepository: Repository<Plan>;

  private ormPlanValueRepository: Repository<PlanValue>;

  constructor() {
    this.ormPlanRepository = getRepository(Plan);
    this.ormPlanValueRepository = getRepository(PlanValue);
  }

  async getAllValuesBySameOrigin(origin_id: string): Promise<PlanValue[]> {
    return this.ormPlanValueRepository.find({ where: { origin_id } });
  }

  async create({ name, user_id }: ICreatePlanDTO): Promise<Plan> {
    const expense = this.ormPlanRepository.create({
      user_id,
      name,
    });

    await this.ormPlanRepository.save(expense);

    return expense;
  }

  async createValue({
    plan_id,
    origin_id,
    name,
    value,
  }: ICreatePlanValueDTO): Promise<PlanValue> {
    const expenseValue = this.ormPlanValueRepository.create({
      plan_id,
      origin_id,
      name,
      value,
    });

    await this.ormPlanValueRepository.save(expenseValue);

    return expenseValue;
  }
}

export default PlanRepository;
