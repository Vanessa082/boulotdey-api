import { UserModel } from "../../db/models/user"

class UserRepo {
  constructor() {
    //
  }

  create(user: any) {
    return UserModel.create(user);
  };

  getOne(id: string) {
    return UserModel.findById(id);
  }

  getAll() {
    return UserModel.find();
  }

  async updateOne(_id: string, updates: any) {
    const prev = await this.getOne(_id);

    return UserModel.updateOne({ _id }, { ...prev, ...updates });
  }
}

export { UserRepo };
