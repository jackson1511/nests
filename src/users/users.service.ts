import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
  //  Inject UserRepository
  constructor(private readonly userRepository: UserRepository){}

  async create(createUserDto: CreateUserDto) {
    const userEntity = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(userEntity);

    if(!user){
      throw new BadRequestException("failed to create user!")
    }
    return user;
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async findOne(id: string) {
    const user =await this.userRepository.findOne({where: {id}})
    if(!user){
      throw new NotFoundException(`user not found with ID: ${id}`)
    }
    return user;
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
    const userDelete = this.userRepository.delete(user);
    if(!userDelete){
      throw new BadRequestException("delete user failed.")
    }
    return `user deleted`;
  }
}
