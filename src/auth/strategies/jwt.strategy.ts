import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../interfaces/jwt.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService, private readonly ConfigService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ConfigService.getOrThrow<string>('JWT_SECRET'),
            algorithms: ['HS256'],
        });
    }

    async validate(payload: JwtPayload) {
        return this.authService.validate(payload.id);
    }
}
