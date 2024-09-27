import { UserModel } from "../../db/models/user";
import type { User } from "./types/types";

class UserRepo {
  private userModel: typeof UserModel;
  constructor() {
    this.userModel = UserModel;
  }

  create(user: Partial<User>) {
    return this.userModel.create<User>(user as User).then(res => res.toJSON());
  }

  getOne(id: string) {
    return this.userModel.findById<User>(id).lean();
  }

  getByEmail(email: string) {
    return this.userModel.findOne<User>({ email }).lean();
  }

  getByEmailAndPhoneNumber(email: string, phoneNumber: string) {
    return this.userModel.findOne<User>({ email, phoneNumber }).lean();
  }

  getAll() {
    return this.userModel.find<User>().lean();
  }

  async updateOne(_id: string, updates: Partial<User>) {
    const prev = await this.getOne(_id);

    return UserModel.updateOne<User>({ _id }, { ...prev, ...updates }).lean();
  }
}

export { UserRepo };
