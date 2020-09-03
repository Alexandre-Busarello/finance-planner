import { Response, Request } from 'express';
import { container } from 'tsyringe';
import GetAllListsService from '@modules/allocation/services/GetAllListsService';

export default class ListsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getAllLists = container.resolve(GetAllListsService);

    const lists = await getAllLists.execute({
      user_id,
    });

    return response.json(lists);
  }
}
