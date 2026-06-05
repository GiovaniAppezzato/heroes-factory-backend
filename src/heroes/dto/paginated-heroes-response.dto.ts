import { HeroResponseDto } from './hero-response.dto';

export type PaginatedHeroesResponseDto = {
  data: HeroResponseDto[];
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
};
