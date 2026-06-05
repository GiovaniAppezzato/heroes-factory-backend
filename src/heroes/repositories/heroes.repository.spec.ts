import { Repository } from 'typeorm';
import { CreateHeroDto } from 'src/heroes/dto/create-hero.dto';
import { FindAllHeroesDto } from 'src/heroes/dto/find-all-heroes.dto';
import { UpdateHeroDto } from 'src/heroes/dto/update-hero.dto';
import { Hero } from 'src/heroes/entities/hero.entity';
import { HEROES_PER_PAGE } from 'src/heroes/heroes.constants';
import { HeroesRepository } from './heroes.repository';

const HERO_ID = '1498ba98-2d4f-488f-8ca6-869897c3bf30';

const hero: Hero = {
  id: HERO_ID,
  name: 'Robert Bruce Banner',
  nickname: 'Hulk',
  dateOfBirth: new Date('1962-04-10'),
  universe: 'Marvel',
  mainPower: 'Force',
  avatarUrl:
    'https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg',
  isActive: true,
  createdAt: new Date('2026-06-05T01:15:10'),
  updatedAt: new Date('2026-06-05T01:15:10'),
};

type QueryBuilderMock = {
  orderBy: jest.Mock<QueryBuilderMock, [string, string]>;
  skip: jest.Mock<QueryBuilderMock, [number]>;
  take: jest.Mock<QueryBuilderMock, [number]>;
  andWhere: jest.Mock<QueryBuilderMock, [unknown]>;
  setParameter: jest.Mock<QueryBuilderMock, [string, string]>;
  getManyAndCount: jest.Mock<Promise<[Hero[], number]>, []>;
};

const makeQueryBuilderMock = (
  heroes: Hero[],
  total: number,
): QueryBuilderMock => {
  const qb = {
    orderBy: jest.fn(),
    skip: jest.fn(),
    take: jest.fn(),
    andWhere: jest.fn(),
    setParameter: jest.fn(),
    getManyAndCount: jest.fn(),
  };

  qb.orderBy.mockReturnValue(qb);
  qb.skip.mockReturnValue(qb);
  qb.take.mockReturnValue(qb);
  qb.andWhere.mockReturnValue(qb);
  qb.setParameter.mockReturnValue(qb);
  qb.getManyAndCount.mockResolvedValue([heroes, total]);

  return qb;
};

const makeRepositoryMock = (): jest.Mocked<Repository<Hero>> =>
  ({
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
  }) as unknown as jest.Mocked<Repository<Hero>>;

describe('HeroesRepository', () => {
  let heroesRepository: HeroesRepository;
  let repository: jest.Mocked<Repository<Hero>>;

  beforeEach(() => {
    repository = makeRepositoryMock();
    heroesRepository = new HeroesRepository(repository);
  });

  describe('create', () => {
    it('maps the DTO fields to entity format, persists and returns the hero', async () => {
      const createHeroDto: CreateHeroDto = {
        name: hero.name,
        nickname: hero.nickname,
        date_of_birth: '1962-04-10',
        universe: hero.universe,
        main_power: hero.mainPower,
        avatar_url: hero.avatarUrl,
      };
      repository.create.mockReturnValue(hero);
      repository.save.mockResolvedValue(hero);

      const result = await heroesRepository.create(createHeroDto);

      expect(repository.create).toHaveBeenCalledWith({
        name: createHeroDto.name,
        nickname: createHeroDto.nickname,
        dateOfBirth: new Date(createHeroDto.date_of_birth),
        universe: createHeroDto.universe,
        mainPower: createHeroDto.main_power,
        avatarUrl: createHeroDto.avatar_url,
        isActive: true,
      });
      expect(repository.save).toHaveBeenCalledWith(hero);
      expect(result).toEqual(hero);
    });
  });

  describe('findAll', () => {
    it('returns heroes ordered by creation date with pagination applied', async () => {
      const query: FindAllHeroesDto = { page: 2 };
      const qb = makeQueryBuilderMock([hero], 1);
      repository.createQueryBuilder.mockReturnValue(qb as never);

      const result = await heroesRepository.findAll(query);

      expect(repository.createQueryBuilder).toHaveBeenCalledWith('hero');
      expect(qb.orderBy).toHaveBeenCalledWith('hero.createdAt', 'DESC');
      expect(qb.skip).toHaveBeenCalledWith(HEROES_PER_PAGE); // page 2 → skip 1 page
      expect(qb.take).toHaveBeenCalledWith(HEROES_PER_PAGE);
      expect(result).toEqual({
        heroes: [hero],
        page: 2,
        perPage: HEROES_PER_PAGE,
        total: 1,
      });
    });

    it('applies a LIKE filter when a search term is provided', async () => {
      const qb = makeQueryBuilderMock([hero], 1);
      repository.createQueryBuilder.mockReturnValue(qb as never);

      await heroesRepository.findAll({ page: 1, search: 'Hulk' });

      expect(qb.andWhere).toHaveBeenCalledTimes(1);
      expect(qb.setParameter).toHaveBeenCalledWith('search', '%Hulk%');
    });

    it('does not apply a filter when no search term is provided', async () => {
      const qb = makeQueryBuilderMock([hero], 1);
      repository.createQueryBuilder.mockReturnValue(qb as never);

      await heroesRepository.findAll({ page: 1 });

      expect(qb.andWhere).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('returns the hero that matches the given id', async () => {
      repository.findOneBy.mockResolvedValue(hero);

      const result = await heroesRepository.findById(HERO_ID);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: HERO_ID });
      expect(result).toEqual(hero);
    });
  });

  describe('update', () => {
    it('merges only the informed fields and persists the hero', async () => {
      const updateHeroDto: UpdateHeroDto = {
        nickname: 'Green Goliath',
        main_power: 'Super strength',
      };
      const updatedHero = {
        ...hero,
        nickname: 'Green Goliath',
        mainPower: 'Super strength',
      };
      repository.save.mockResolvedValue(updatedHero);

      const result = await heroesRepository.update(hero, updateHeroDto);

      expect(repository.merge).toHaveBeenCalledWith(hero, {
        nickname: updateHeroDto.nickname,
        mainPower: updateHeroDto.main_power,
      });
      expect(repository.save).toHaveBeenCalledWith(hero);
      expect(result).toEqual(updatedHero);
    });
  });

  describe('deactivate', () => {
    it('sets isActive to false and persists the hero', async () => {
      repository.save.mockResolvedValue({ ...hero, isActive: false });

      const result = await heroesRepository.deactivate(hero);

      expect(hero.isActive).toBe(false);
      expect(repository.save).toHaveBeenCalledWith(hero);
      expect(result.isActive).toBe(false);
    });
  });

  describe('activate', () => {
    it('sets isActive to true and persists the hero', async () => {
      const inactiveHero = { ...hero, isActive: false };
      repository.save.mockResolvedValue({ ...hero, isActive: true });

      const result = await heroesRepository.activate(inactiveHero);

      expect(inactiveHero.isActive).toBe(true);
      expect(repository.save).toHaveBeenCalledWith(inactiveHero);
      expect(result.isActive).toBe(true);
    });
  });

  describe('delete', () => {
    it('removes the hero from the database', async () => {
      repository.remove.mockResolvedValue(hero);

      await heroesRepository.delete(hero);

      expect(repository.remove).toHaveBeenCalledWith(hero);
    });
  });
});
