import { CreateHeroDto } from 'src/heroes/dto/create-hero.dto';
import { FindAllHeroesDto } from 'src/heroes/dto/find-all-heroes.dto';
import { HeroResponseDto } from 'src/heroes/dto/hero-response.dto';
import { PaginatedHeroesResponseDto } from 'src/heroes/dto/paginated-heroes-response.dto';
import { UpdateHeroDto } from 'src/heroes/dto/update-hero.dto';
import { HeroesService } from 'src/heroes/services/heroes.service';
import { HeroesController } from './heroes.controller';

const HERO_ID = '1498ba98-2d4f-488f-8ca6-869897c3bf30';

const heroResponse: HeroResponseDto = {
  id: HERO_ID,
  name: 'Robert Bruce Banner',
  nickname: 'Hulk',
  date_of_birth: '1962-04-10 00:00:00',
  universe: 'Marvel',
  main_power: 'Force',
  avatar_url:
    'https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg',
  is_active: true,
  created_at: '2026-06-05 01:15:10',
  updated_at: '2026-06-05 01:15:10',
};

const makeServiceMock = (): jest.Mocked<HeroesService> =>
  ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deactivate: jest.fn(),
    activate: jest.fn(),
  }) as unknown as jest.Mocked<HeroesService>;

describe('HeroesController', () => {
  let controller: HeroesController;
  let service: jest.Mocked<HeroesService>;

  beforeEach(() => {
    service = makeServiceMock();
    controller = new HeroesController(service);
  });

  describe('findAll', () => {
    it('delegates to the service and returns paginated heroes', async () => {
      const query: FindAllHeroesDto = { page: 1, search: 'Hulk' };
      const paginatedResponse: PaginatedHeroesResponseDto = {
        data: [heroResponse],
        meta: { page: 1, per_page: 10, total: 1, total_pages: 1 },
      };
      service.findAll.mockResolvedValue(paginatedResponse);

      const result = await controller.findAll(query);

      expect(result).toEqual(paginatedResponse);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('create', () => {
    it('delegates to the service and returns the created hero', async () => {
      const createHeroDto: CreateHeroDto = {
        name: heroResponse.name,
        nickname: heroResponse.nickname,
        date_of_birth: '1962-04-10',
        universe: heroResponse.universe,
        main_power: heroResponse.main_power,
        avatar_url: heroResponse.avatar_url,
      };
      service.create.mockResolvedValue(heroResponse);

      const result = await controller.create(createHeroDto);

      expect(result).toEqual(heroResponse);
      expect(service.create).toHaveBeenCalledWith(createHeroDto);
    });
  });

  describe('findOne', () => {
    it('delegates to the service and returns the matching hero', async () => {
      service.findOne.mockResolvedValue(heroResponse);

      const result = await controller.findOne(HERO_ID);

      expect(result).toEqual(heroResponse);
      expect(service.findOne).toHaveBeenCalledWith(HERO_ID);
    });
  });

  describe('update', () => {
    it('delegates to the service and returns the updated hero', async () => {
      const updateHeroDto: UpdateHeroDto = { main_power: 'Super strength' };
      const updatedHero = { ...heroResponse, main_power: 'Super strength' };
      service.update.mockResolvedValue(updatedHero);

      const result = await controller.update(HERO_ID, updateHeroDto);

      expect(result.main_power).toBe('Super strength');
      expect(service.update).toHaveBeenCalledWith(HERO_ID, updateHeroDto);
    });
  });

  describe('delete', () => {
    it('delegates to the service and returns nothing', async () => {
      service.delete.mockResolvedValue(undefined);

      const result = await controller.delete(HERO_ID);

      expect(result).toBeUndefined();
      expect(service.delete).toHaveBeenCalledWith(HERO_ID);
    });
  });

  describe('deactivate', () => {
    it('delegates to the service and returns the hero as inactive', async () => {
      const inactiveHero = { ...heroResponse, is_active: false };
      service.deactivate.mockResolvedValue(inactiveHero);

      const result = await controller.deactivate(HERO_ID);

      expect(result.is_active).toBe(false);
      expect(service.deactivate).toHaveBeenCalledWith(HERO_ID);
    });
  });

  describe('activate', () => {
    it('delegates to the service and returns the hero as active', async () => {
      service.activate.mockResolvedValue(heroResponse);

      const result = await controller.activate(HERO_ID);

      expect(result.is_active).toBe(true);
      expect(service.activate).toHaveBeenCalledWith(HERO_ID);
    });
  });
});
