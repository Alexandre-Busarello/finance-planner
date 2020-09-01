import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreatePlanValueService from '@modules/allocation/services/Plan/CreatePlanValueService';

export default class IncomePlanDistributionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, value } = request.body;
    const { plan_id, origin_id } = request.params;

    const createPlanValue = container.resolve(CreatePlanValueService);

    const planValue = await createPlanValue.execute({
      plan_id,
      origin_id,
      name,
      value,
    });

    return response.status(201).json(planValue);
  }
}
