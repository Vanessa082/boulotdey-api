import { UserModel } from "../../db/models/user"
import type { User } from "./types/types";

class UserRepo {
  private userModel: typeof UserModel;
  constructor() {
    this.userModel = UserModel;
  }

  create(user: User) {
    return this.userModel.create(user);
  };

  getOne(id: string) {
    return this.userModel.findById(id);
  }

  getByEmail(email: string) {
    return this.userModel.findOne({email})
  }

  getAll() {
    return this.userModel.find();
  }

  async updateOne(_id: string, updates: Partial<User>) {
    const prev = await this.getOne(_id);

    return UserModel.updateOne({ _id }, { ...prev, ...updates });
  }
}

export { UserRepo };
