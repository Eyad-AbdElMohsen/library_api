import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/user.model";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { Op } from "sequelize";

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
    const res = await this.userModel.destroy({ 
      where: { id },
      force: true, // for @AfterDestroy hook
    })
    return res === 1;
  }

  async getEmails(users: Array<number>) {
    return await this.userModel.findAll({
      where: {
        id: {
          [Op.in]: users
        }
      },
      attributes: ['email']
    })
  }
}
