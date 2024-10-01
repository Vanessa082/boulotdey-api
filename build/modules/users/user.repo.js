"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const user_1 = require("../../db/models/user");
class UserRepo {
    userModel;
    constructor() {
        this.userModel = user_1.UserModel;
    }
    create(user) {
        return this.userModel.create(user).then(res => res.toJSON());
    }
    getOne(id) {
        return this.userModel.findById(id).lean();
    }
    getByEmail(email) {
        return this.userModel.findOne({ email }).lean();
    }
    getByEmailAndPhoneNumber(email, phoneNumber) {
        return this.userModel.findOne({ email, phoneNumber }).lean();
    }
    getAll() {
        return this.userModel.find().lean();
    }
    async updateOne(_id, updates) {
        const prev = await this.getOne(_id);
        return user_1.UserModel.updateOne({ _id }, { ...prev, ...updates }).lean();
    }
}
exports.UserRepo = UserRepo;
