import { Controller, Get, Param, Delete, Body, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  addUser(@Body('name') name: string, @Body('email') email:string) {
    return this.usersService.addUser(name,email);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('name') name: string, @Body('email') email: string) {
    return this.usersService.update(id, name,email);
  }
}
