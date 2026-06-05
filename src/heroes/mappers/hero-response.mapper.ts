import moment from 'moment';
import { HeroResponseDto } from 'src/heroes/dto/hero-response.dto';
import { PaginatedHeroesResponseDto } from 'src/heroes/dto/paginated-heroes-response.dto';
import { Hero } from 'src/heroes/entities/hero.entity';

const formatDateTime = (value: Date | string): string =>
  moment(value).format('YYYY-MM-DD HH:mm:ss');

export const toHeroResponseDto = (hero: Hero): HeroResponseDto => ({
  id: hero.id,
  name: hero.name,
  nickname: hero.nickname,
  date_of_birth: formatDateTime(hero.dateOfBirth),
  universe: hero.universe,
  main_power: hero.mainPower,
  avatar_url: hero.avatarUrl,
  is_active: hero.isActive,
  created_at: formatDateTime(hero.createdAt),
  updated_at: formatDateTime(hero.updatedAt),
});

export const toPaginatedHeroesResponseDto = (
  heroes: Hero[],
  page: number,
  perPage: number,
  total: number,
): PaginatedHeroesResponseDto => ({
  data: heroes.map(toHeroResponseDto),
  meta: {
    page,
    per_page: perPage,
    total,
    total_pages: Math.ceil(total / perPage),
  },
});
