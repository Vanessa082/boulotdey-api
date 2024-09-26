import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { JWT_CONFIG, SALT_ROUNDS } from "../../config";
import { UserRepo } from "../users/user.repo";
import { number, string } from "joi";
interface JWTPayload {
  _id: string;
  email: string;
  phoneNumber?: string
}
class AuthService {
  constructor() {
    //
  };

  jwtSign(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_CONFIG.secrete, { expiresIn: JWT_CONFIG.expiration_time });
  };

  jwtVerify(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_CONFIG.secrete) as JWTPayload;
    } catch {
      return null;
    }
  };

  hash(password: string) {
    return bcrypt.hash(password, SALT_ROUNDS)
  };

  compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword )
  }
}

export { AuthService };
