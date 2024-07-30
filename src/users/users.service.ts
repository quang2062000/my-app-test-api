import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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

  addUser(name: string, email:string): Promise<User> {
    const newUser = this.usersRepository.create({name,email})
    return this.usersRepository.save(newUser)
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: number, name: string,email:string): Promise<User> {
    const newUser = await this.usersRepository.update(id,{name,email})
    if (!newUser) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return this.usersRepository.findOne({where:{id}});
  }
}
