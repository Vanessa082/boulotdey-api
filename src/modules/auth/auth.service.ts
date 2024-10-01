import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { JWT_CONFIG, SALT_ROUNDS } from "../../config";
import { UserRepo } from "../users/user.repo";
import { number, string } from "joi";
interface JWTPayload {
  _id: string;
  email: string;
  phoneNumber?: string;
}
class AuthService {
  constructor() {
    //
  }

  jwtSign(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_CONFIG.secrete, {
      expiresIn: JWT_CONFIG.expiration_time,
    });
  }

  jwtVerify(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_CONFIG.secrete) as JWTPayload;
    } catch {
      return null;
    }
  }

  async hash(password: string) {
    try {
      const salt = await bcrypt.genSalt(+SALT_ROUNDS); // the "+" tries to convert SALT_ROUNDS to a number

      return bcrypt.hash(password, salt);
    } catch (error) {
      throw error
    }
  }

  compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export { AuthService };
