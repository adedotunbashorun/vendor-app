import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JWT auth strategy.
 *
 * A default value is provided for the jwt secret in case it is not available.
 * @todo use injected config
 */
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'oPLx8XJR*Fc0Dz5$0tgX^LfLxneUQpqM',
      ignoreExpiration: false,
    });
  }

  /**
   * Check if JWT Token is valid
   */
  async validate(payload: any) {
    return payload;
  }
}
