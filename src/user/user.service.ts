import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { BookStatsRepository } from "src/book-stats/book-stats.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bookStatsRepository: BookStatsRepository
  ) { }

  async findAll() {
    return this.userRepository.findAll()
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findById(id)
    if (!user)
      throw new HttpException('User is not Found', HttpStatus.NOT_FOUND)
    return user
  }

  async deleteUser(id: number) {
    await this.bookStatsRepository.removeUser(id)
    const res = await this.userRepository.delete(id)
    if (!res)
      throw new HttpException('No User Found', HttpStatus.NOT_FOUND,);

    return { message: 'Successfully Deleted!' };
  }
}
