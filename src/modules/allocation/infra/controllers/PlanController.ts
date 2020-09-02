import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreatePlanListService from '@modules/allocation/services/Plan/CreatePlanListService';

export default class PlanController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, objective_value } = request.body;
    const user_id = request.user.id;

    const createPlanList = container.resolve(CreatePlanListService);

    const planList = await createPlanList.execute({
      user_id,
      name,
      accomplished_value: 0,
      objective_value,
    });

    return response.status(201).json(planList);
  }
}
