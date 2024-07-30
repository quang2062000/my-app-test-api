import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  addUser(createUser : CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create({name:createUser.name,email:createUser.email})
    return this.usersRepository.save(newUser)
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: number,updateUser: UpdateUserDto): Promise<User> {
    const newUser = await this.usersRepository.update(id,{name: updateUser.name,email:updateUser.email})
    if (!newUser) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return this.usersRepository.findOne({where:{id}});
  }
}
