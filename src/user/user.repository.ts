import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/user.model";
import { CreateUserDto } from "./dto/CreateUser.dto";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) { }

  async findAll() {
    return await this.userModel.findAll()
  }

  async findById(id: number) {
    return await this.userModel.findByPk(id)
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } })
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return await this.userModel.create({ email, password });
  }

  async delete(id: number) {
    const res = await this.userModel.destroy({ where: { id } })
    return res === 1; 
  }
}
