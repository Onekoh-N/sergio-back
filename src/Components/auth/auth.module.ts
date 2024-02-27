import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';



@Module({
  imports: [forwardRef(() => UsersModule),
    JwtModule.registerAsync({                                 //CARGA LA CONFIGURACIÓN DEL JWT DE 
      imports: [ConfigModule],                                //MANERA ASINCRONA PARA LEER EL JWT 
      useFactory: async(configService: ConfigService) => ({   //COMO UNA VARIABLE DE ENTORNO.
        secret: process.env.JWT_SECRET,
        global: true,
        signOptions: { expiresIn: process.env.JWT_EXPIRES },
        }),
        inject: [ConfigService],
      }),                                                     // FIN CARGA DE JWT                                                 
  ], 
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule]
})
export class AuthModule {}
