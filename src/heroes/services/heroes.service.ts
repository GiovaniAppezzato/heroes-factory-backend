import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHeroDto } from 'src/heroes/dto/create-hero.dto';
import { FindAllHeroesDto } from 'src/heroes/dto/find-all-heroes.dto';
import { HeroResponseDto } from 'src/heroes/dto/hero-response.dto';
import { PaginatedHeroesResponseDto } from 'src/heroes/dto/paginated-heroes-response.dto';
import { UpdateHeroDto } from 'src/heroes/dto/update-hero.dto';
import {
  toHeroResponseDto,
  toPaginatedHeroesResponseDto,
} from 'src/heroes/mappers/hero-response.mapper';
import { HeroesRepository } from 'src/heroes/repositories/heroes.repository';

@Injectable()
export class HeroesService {
  constructor(private readonly heroesRepository: HeroesRepository) {}

  async findAll(query: FindAllHeroesDto): Promise<PaginatedHeroesResponseDto> {
    const result = await this.heroesRepository.findAll(query);

    return toPaginatedHeroesResponseDto(
      result.heroes,
      result.page,
      result.perPage,
      result.total,
    );
  }

  async findOne(id: string): Promise<HeroResponseDto> {
    const hero = await this.findHeroOrFail(id);

    return toHeroResponseDto(hero);
  }

  async create(createHeroDto: CreateHeroDto): Promise<HeroResponseDto> {
    const hero = await this.heroesRepository.create(createHeroDto);

    return toHeroResponseDto(hero);
  }

  async update(
    id: string,
    updateHeroDto: UpdateHeroDto,
  ): Promise<HeroResponseDto> {
    const hero = await this.findHeroOrFail(id);

    if (!hero.isActive) {
      throw new BadRequestException('Cannot edit an inactive hero.');
    }

    const updatedHero = await this.heroesRepository.update(hero, updateHeroDto);

    return toHeroResponseDto(updatedHero);
  }

  async deactivate(id: string): Promise<HeroResponseDto> {
    const hero = await this.findHeroOrFail(id);

    if (!hero.isActive) {
      throw new BadRequestException('Hero is already inactive.');
    }

    const deactivatedHero = await this.heroesRepository.deactivate(hero);

    return toHeroResponseDto(deactivatedHero);
  }

  async delete(id: string): Promise<void> {
    const hero = await this.findHeroOrFail(id);

    await this.heroesRepository.delete(hero);
  }

  async activate(id: string): Promise<HeroResponseDto> {
    const hero = await this.findHeroOrFail(id);

    if (hero.isActive) {
      throw new BadRequestException('Hero is already active.');
    }

    const activatedHero = await this.heroesRepository.activate(hero);

    return toHeroResponseDto(activatedHero);
  }

  private async findHeroOrFail(id: string) {
    const hero = await this.heroesRepository.findById(id);

    if (!hero) {
      throw new NotFoundException('Hero not found.');
    }

    return hero;
  }
}
