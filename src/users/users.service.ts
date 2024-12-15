import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './entities/user.repository';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  //  Inject UserRepository
  constructor(private readonly userRepository: UserRepository){}

  async create(createUserDto: CreateUserDto) {
    try {
      const userEntity = this.userRepository.create(createUserDto);

    const passwordHash = await bcrypt.hash(createUserDto.password,10);

    if(!passwordHash){
      throw new BadRequestException("password hashed faild.")
    }

    // userEntity.password = passwordHash; 

    const user = await this.userRepository.save({
      ...userEntity,
      password: passwordHash
    });

    if(!user){
      throw new BadRequestException("failed to create user!")
    }
    return user;
    } catch (error) {
      if(error instanceof BadRequestException)
      {
        throw error;
      }

      throw new BadRequestException(error);
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository,{
      sortableColumns: ['firstname', 'firstname'],
      searchableColumns: ['firstname', 'lastname']
    })
  }

  async findOne(id: string) {
    const user =await this.userRepository.findOne({where: {id}})
    if(!user){
      throw new NotFoundException(`user not found with ID: ${id}`)
    }
    return user;
  }

  /** findByEmail */
  async findOneByEmail(email: string){
    return await this.userRepository.findOne({where: {email}});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({where: {id}})
    if(!user){
      throw new NotFoundException(`user not found with ID: ${id}`)
    }
    
    const userUpdate = await this.userRepository.save({
      ...user,
      ...updateUserDto
    })
    if(!userUpdate){
      throw new BadRequestException("update user failed.")
    }
    return userUpdate;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({where: {id}})
    if(!user){
      throw new NotFoundException(`user not found with ID: ${id}`)
    }
    const userDelete = this.userRepository.delete(id);
    if(!userDelete){
      throw new BadRequestException("delete user failed.")
    }
    return `user deleted`;
  }

  // compare hash password 
  async compareHash(text: string, hash: string){
    try {
      return await bcrypt.compare(text,hash)
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
