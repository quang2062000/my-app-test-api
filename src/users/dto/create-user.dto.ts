import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: '', description: 'The name of the user' })
    @IsString()
    name: string;
  
    @ApiProperty({ example: '', description: 'The email of the user' })
    @IsString()
    email: string;
}