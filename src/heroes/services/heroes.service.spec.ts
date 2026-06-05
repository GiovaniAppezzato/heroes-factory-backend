import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from 'src/heroes/dto/create-hero.dto';
import { FindAllHeroesDto } from 'src/heroes/dto/find-all-heroes.dto';
import { UpdateHeroDto } from 'src/heroes/dto/update-hero.dto';
import { Hero } from 'src/heroes/entities/hero.entity';
import { HEROES_PER_PAGE } from 'src/heroes/heroes.constants';
import { HeroesRepository } from 'src/heroes/repositories/heroes.repository';
import { HeroesService } from './heroes.service';

const HERO_ID = '1498ba98-2d4f-488f-8ca6-869897c3bf30';

const activeHero: Hero = {
  id: HERO_ID,
  name: 'Robert Bruce Banner',
  nickname: 'Hulk',
  dateOfBirth: '1962-04-10' as unknown as Date,
  universe: 'Marvel',
  mainPower: 'Force',
  avatarUrl:
    'https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg',
  isActive: true,
  createdAt: new Date('2026-06-05T01:15:10'),
  updatedAt: new Date('2026-06-05T01:15:10'),
};

const inactiveHero: Hero = { ...activeHero, isActive: false };

const makeRepositoryMock = (): jest.Mocked<HeroesRepository> =>
  ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deactivate: jest.fn(),
    delete: jest.fn(),
    activate: jest.fn(),
  }) as unknown as jest.Mocked<HeroesRepository>;

describe('HeroesService', () => {
  let service: HeroesService;
  let repository: jest.Mocked<HeroesRepository>;

  beforeEach(() => {
    repository = makeRepositoryMock();
    service = new HeroesService(repository);
  });

  describe('create', () => {
    it('persists the hero and returns it as an API response DTO', async () => {
      const createHeroDto: CreateHeroDto = {
        name: activeHero.name,
        nickname: activeHero.nickname,
        date_of_birth: '1962-04-10',
        universe: activeHero.universe,
        main_power: activeHero.mainPower,
        avatar_url: activeHero.avatarUrl,
      };
      repository.create.mockResolvedValue(activeHero);

      const result = await service.create(createHeroDto);

      expect(repository.create).toHaveBeenCalledWith(createHeroDto);
      expect(result).toEqual({
        id: activeHero.id,
        name: activeHero.name,
        nickname: activeHero.nickname,
        date_of_birth: '1962-04-10 00:00:00',
        universe: activeHero.universe,
        main_power: activeHero.mainPower,
        avatar_url: activeHero.avatarUrl,
        is_active: true,
        created_at: '2026-06-05 01:15:10',
        updated_at: '2026-06-05 01:15:10',
      });
    });
  });

  describe('findAll', () => {
    it('returns heroes mapped to DTOs with pagination metadata', async () => {
      const query: FindAllHeroesDto = { page: 1, search: 'Hulk' };
      repository.findAll.mockResolvedValue({
        heroes: [activeHero],
        page: 1,
        perPage: HEROES_PER_PAGE,
        total: 1,
      });

      const result = await service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith(query);
      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({
        page: 1,
        per_page: HEROES_PER_PAGE,
        total: 1,
        total_pages: 1,
      });
    });
  });

  describe('findOne', () => {
    it('returns the hero that matches the given id', async () => {
      repository.findById.mockResolvedValue(activeHero);

      const result = await service.findOne(HERO_ID);

      expect(repository.findById).toHaveBeenCalledWith(HERO_ID);
      expect(result.id).toBe(HERO_ID);
    });

    it('throws NotFoundException when no hero is found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(HERO_ID)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('updates and returns the hero when it is active', async () => {
      const updateHeroDto: UpdateHeroDto = { main_power: 'Super strength' };
      const updatedHero = { ...activeHero, mainPower: 'Super strength' };
      repository.findById.mockResolvedValue(activeHero);
      repository.update.mockResolvedValue(updatedHero);

      const result = await service.update(HERO_ID, updateHeroDto);

      expect(repository.update).toHaveBeenCalledWith(activeHero, updateHeroDto);
      expect(result.main_power).toBe('Super strength');
    });

    it('throws BadRequestException and skips update when the hero is inactive', async () => {
      repository.findById.mockResolvedValue(inactiveHero);

      await expect(
        service.update(HERO_ID, { universe: 'Marvel Comics' }),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(repository.update).not.toHaveBeenCalled();
    });
  });

  describe('deactivate', () => {
    it('deactivates and returns the hero when it is active', async () => {
      repository.findById.mockResolvedValue(activeHero);
      repository.deactivate.mockResolvedValue(inactiveHero);

      const result = await service.deactivate(HERO_ID);

      expect(repository.deactivate).toHaveBeenCalledWith(activeHero);
      expect(result.is_active).toBe(false);
    });

    it('throws BadRequestException and skips deactivation when the hero is already inactive', async () => {
      repository.findById.mockResolvedValue(inactiveHero);

      await expect(service.deactivate(HERO_ID)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(repository.deactivate).not.toHaveBeenCalled();
    });
  });

  describe('activate', () => {
    it('activates and returns the hero when it is inactive', async () => {
      repository.findById.mockResolvedValue(inactiveHero);
      repository.activate.mockResolvedValue(activeHero);

      const result = await service.activate(HERO_ID);

      expect(repository.activate).toHaveBeenCalledWith(inactiveHero);
      expect(result.is_active).toBe(true);
    });

    it('throws BadRequestException and skips activation when the hero is already active', async () => {
      repository.findById.mockResolvedValue(activeHero);

      await expect(service.activate(HERO_ID)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(repository.activate).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('deletes the hero when it exists', async () => {
      repository.findById.mockResolvedValue(activeHero);

      await service.delete(HERO_ID);

      expect(repository.delete).toHaveBeenCalledWith(activeHero);
    });
  });
});
