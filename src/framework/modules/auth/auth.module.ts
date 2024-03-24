/* v8 ignore start */
import { buildAutenticarUsuarioUseCase } from '@/domain/application/factories/usuario/autenticar-usuario.use-case.factory';
import { AUTENTICAR_USUARIO_USE_CASE } from '@/domain/application/symbols/usuario.symbols';
import { UsuarioEntity } from '@/framework/entities/usuario.entity';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import env from '../../../config/env';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
	imports: [
		JwtModule.register({
			secret: env.JWT_KEY,
			signOptions: { expiresIn: '24h' },
		}),
		TypeOrmModule.forFeature([UsuarioEntity])
	],
	providers: [
		JwtStrategy,
		UsuarioRepository,
		{
			provide: AUTENTICAR_USUARIO_USE_CASE,
			inject: [UsuarioRepository, JwtService],
			useFactory: buildAutenticarUsuarioUseCase
		},
	],
	controllers: [AuthController]
})
export class AuthModule {}
/* v8 ignore stop */
