import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '@vendor-app/config/index';
import { MongooseModelModule } from '@vendor-app/core/mongooseModels.module';
import { rootMongooseTestModule } from '../../../test/database';
import { DepositsService } from './deposits.service';

describe('DepositsService', () => {
  let service: DepositsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModelModule,
        PassportModule,
        JwtModule.register({
          secret: configuration().jwt.secret,
          signOptions: { expiresIn: configuration().jwt.duration || '360000s' },
        }),
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      providers: [DepositsService],
    }).compile();

    service = module.get<DepositsService>(DepositsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
