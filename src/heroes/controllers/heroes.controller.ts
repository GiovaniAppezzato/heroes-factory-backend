import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateHeroDto } from 'src/heroes/dto/create-hero.dto';
import { FindAllHeroesDto } from 'src/heroes/dto/find-all-heroes.dto';
import { HeroResponseDto } from 'src/heroes/dto/hero-response.dto';
import { PaginatedHeroesResponseDto } from 'src/heroes/dto/paginated-heroes-response.dto';
import { UpdateHeroDto } from 'src/heroes/dto/update-hero.dto';
import { HeroesService } from 'src/heroes/services/heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  findAll(
    @Query() query: FindAllHeroesDto,
  ): Promise<PaginatedHeroesResponseDto> {
    return this.heroesService.findAll(query);
  }

  @Post()
  create(@Body() createHeroDto: CreateHeroDto): Promise<HeroResponseDto> {
    return this.heroesService.create(createHeroDto);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<HeroResponseDto> {
    return this.heroesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateHeroDto: UpdateHeroDto,
  ): Promise<HeroResponseDto> {
    return this.heroesService.update(id, updateHeroDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.heroesService.delete(id);
  }

  @Patch(':id/deactivate')
  deactivate(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<HeroResponseDto> {
    return this.heroesService.deactivate(id);
  }

  @Patch(':id/activate')
  activate(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<HeroResponseDto> {
    return this.heroesService.activate(id);
  }
}
