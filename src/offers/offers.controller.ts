import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../users/interfaces/valid-roles';
import { User } from 'src/users/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    @InjectRepository(Offer)
    private readonly offersRepository : Repository<Offer>
  ) {}

  @Auth(ValidRoles.recruiter, ValidRoles.company)
  @Post()
  create(@Body() createOfferDto: CreateOfferDto, @GetUser() user: User) {
    return this.offersService.create(createOfferDto, user.id);
  }
  
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.offersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }

  @Auth(ValidRoles.recruiter, ValidRoles.company)
  @Get('/company/:id')
  findAllByCompany(@Param('id', ParseUUIDPipe) companyId: string){
    return companyId;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offersService.remove(+id);
  }
}
