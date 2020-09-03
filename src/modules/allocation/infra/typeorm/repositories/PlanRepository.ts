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

  async getById(id: string): Promise<Plan | undefined> {
    return this.ormPlanRepository.findOne(id);
  }

  async getAllValuesBySameOrigin(origin_id: string): Promise<PlanValue[]> {
    return this.ormPlanValueRepository.find({ where: { origin_id } });
  }

  async getAllUserPlans(user_id: string): Promise<Plan[]> {
    return this.ormPlanRepository.find({ where: { user_id } });
  }

  async save(data: Plan): Promise<Plan> {
    return this.ormPlanRepository.save(data);
  }

  async create({
    name,
    user_id,
    objective_value,
    accomplished_value,
  }: ICreatePlanDTO): Promise<Plan> {
    const plan = this.ormPlanRepository.create({
      user_id,
      name,
      objective_value,
      accomplished_value,
    });

    await this.ormPlanRepository.save(plan);

    return plan;
  }

  async createValue({
    plan_id,
    origin_id,
    name,
    value,
  }: ICreatePlanValueDTO): Promise<PlanValue> {
    const planValue = this.ormPlanValueRepository.create({
      plan_id,
      origin_id,
      name,
      value,
    });

    await this.ormPlanValueRepository.save(planValue);

    return planValue;
  }
}

export default PlanRepository;
