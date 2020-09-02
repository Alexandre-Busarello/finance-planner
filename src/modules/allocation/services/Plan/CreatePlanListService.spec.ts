import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePlanRepository from '@modules/allocation/repositories/Plan/fakes/FakePlanRepository';
import CreatePlanListService from './CreatePlanListService';

let fakeUsersRepository: FakeUsersRepository;
let fakePlanRepository: FakePlanRepository;
let createPlanListService: CreatePlanListService;

describe('CreatePlanListService', () => {
  beforeEach(() => {
    fakePlanRepository = new FakePlanRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createPlanListService = new CreatePlanListService(
      fakePlanRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a plan list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const plan = await createPlanListService.execute({
      user_id: user.id,
      name: 'Car',
      objective_value: 10000,
      accomplished_value: 0,
    });

    expect(plan).toBeDefined();
    expect(plan.name).toEqual('Car');
    expect(plan.objective_value).toEqual(10000);
  });

  it('should not be able to create an expense list if user doesnt exists', async () => {
    await expect(
      createPlanListService.execute({
        user_id: 'non-existing user',
        name: 'Car',
        objective_value: 10000,
        accomplished_value: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
