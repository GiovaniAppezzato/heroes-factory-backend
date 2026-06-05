import { Inject, Injectable } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { CreateHeroDto } from 'src/heroes/dto/create-hero.dto';
import { FindAllHeroesDto } from 'src/heroes/dto/find-all-heroes.dto';
import { UpdateHeroDto } from 'src/heroes/dto/update-hero.dto';
import { Hero } from 'src/heroes/entities/hero.entity';
import { HERO_REPOSITORY, HEROES_PER_PAGE } from 'src/heroes/heroes.constants';

@Injectable()
export class HeroesRepository {
  constructor(
    @Inject(HERO_REPOSITORY)
    private readonly repository: Repository<Hero>,
  ) {}

  async findAll(
    query: FindAllHeroesDto,
  ): Promise<{ heroes: Hero[]; page: number; perPage: number; total: number }> {
    const { page, search } = query;

    const queryBuilder = this.repository
      .createQueryBuilder('hero')
      .orderBy('hero.createdAt', 'DESC')
      .skip((page - 1) * HEROES_PER_PAGE)
      .take(HEROES_PER_PAGE);

    if (search) {
      queryBuilder
        .andWhere(
          new Brackets((qb) => {
            qb.where('hero.name LIKE :search').orWhere(
              'hero.nickname LIKE :search',
            );
          }),
        )
        .setParameter('search', `%${search}%`);
    }

    const [heroes, total] = await queryBuilder.getManyAndCount();

    return {
      heroes,
      page,
      perPage: HEROES_PER_PAGE,
      total,
    };
  }

  async findById(id: string): Promise<Hero | null> {
    return this.repository.findOneBy({ id });
  }

  async create(createHeroDto: CreateHeroDto): Promise<Hero> {
    const hero = this.repository.create({
      name: createHeroDto.name,
      nickname: createHeroDto.nickname,
      dateOfBirth: new Date(createHeroDto.date_of_birth),
      universe: createHeroDto.universe,
      mainPower: createHeroDto.main_power,
      avatarUrl: createHeroDto.avatar_url,
      isActive: true,
    });

    return this.repository.save(hero);
  }

  async update(hero: Hero, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    const { name, nickname, date_of_birth, universe, main_power, avatar_url } =
      updateHeroDto;

    this.repository.merge(hero, {
      ...(name !== undefined && { name }),
      ...(nickname !== undefined && { nickname }),
      ...(date_of_birth !== undefined && {
        dateOfBirth: new Date(date_of_birth),
      }),
      ...(universe !== undefined && { universe }),
      ...(main_power !== undefined && { mainPower: main_power }),
      ...(avatar_url !== undefined && { avatarUrl: avatar_url }),
    });

    return this.repository.save(hero);
  }

  async deactivate(hero: Hero): Promise<Hero> {
    hero.isActive = false;

    return this.repository.save(hero);
  }

  async delete(hero: Hero): Promise<void> {
    await this.repository.remove(hero);
  }

  async activate(hero: Hero): Promise<Hero> {
    hero.isActive = true;

    return this.repository.save(hero);
  }
}
