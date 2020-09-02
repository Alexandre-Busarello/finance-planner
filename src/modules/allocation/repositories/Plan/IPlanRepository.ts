import ICreatePlanValueDTO from '@modules/allocation/dtos/ICreatePlanValueDTO';
import ICreatePlanDTO from '@modules/allocation/dtos/ICreatePlanDTO';
import Plan from '@modules/allocation/infra/typeorm/entities/Plan';
import PlanValue from '@modules/allocation/infra/typeorm/entities/PlanValue';

export default interface IPlanRepository {
  getById(id: string): Promise<Plan | undefined>;
  create(data: ICreatePlanDTO): Promise<Plan>;
  save(data: Plan): Promise<Plan>;

  getAllValuesBySameOrigin(origin_id: string): Promise<PlanValue[]>;
  createValue(data: ICreatePlanValueDTO): Promise<PlanValue>;
}
