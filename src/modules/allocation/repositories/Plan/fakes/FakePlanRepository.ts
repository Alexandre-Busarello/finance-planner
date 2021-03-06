import { uuid } from 'uuidv4';

import Plan from '@modules/allocation/infra/typeorm/entities/Plan';
import PlanValue from '@modules/allocation/infra/typeorm/entities/PlanValue';
import ICreatePlanDTO from '@modules/allocation/dtos/ICreatePlanDTO';
import ICreatePlanValueDTO from '@modules/allocation/dtos/ICreatePlanValueDTO';
import IPlanRepository from '../IPlanRepository';

class FakePlanRepository implements IPlanRepository {
  private plans: Plan[] = [];

  private planValues: PlanValue[] = [];

  async getById(id: string): Promise<Plan | undefined> {
    return this.plans.find(plan => plan.id === id);
  }

  async getAllValuesBySameOrigin(origin_id: string): Promise<PlanValue[]> {
    return this.planValues.filter(plan => plan.origin_id === origin_id);
  }

  async getAllUserPlans(user_id: string): Promise<Plan[]> {
    return this.plans.filter(plan => plan.user_id === user_id);
  }

  async save(data: Plan): Promise<Plan> {
    const index = this.plans.findIndex(plan => {
      return plan.id === data.id;
    });

    this.plans[index] = data;

    return this.plans[index];
  }

  async create(data: ICreatePlanDTO): Promise<Plan> {
    const plan = new Plan();

    Object.assign(plan, { id: uuid() }, data);
    this.plans.push(plan);

    return plan;
  }

  async createValue(data: ICreatePlanValueDTO): Promise<PlanValue> {
    const value = new PlanValue();

    Object.assign(value, { id: uuid() }, data);
    this.planValues.push(value);

    return value;
  }
}

export default FakePlanRepository;
