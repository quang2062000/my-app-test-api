import { Controller, Get, Param, Delete, Body, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'All users', type: [User] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create users' })
  @ApiResponse({ status: 201, description: 'The cat has been successfully created.', type: User })
  addUser(@Body() createUser : CreateUserDto ) {
    return this.usersService.addUser(createUser);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find users by ID' })
  @ApiResponse({ status: 200, description: 'Information users', type: User })
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete users by ID' })
  @ApiResponse({ status: 200, description: 'Information users delete', type: User })
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update users' })
  @ApiParam({ name: 'id', description: 'ID of the user', type: Number })
  @ApiResponse({ status: 201, description: 'The user has been successfully update.', type: User })
  update(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    return this.usersService.update(id, updateUser);
  }
}
