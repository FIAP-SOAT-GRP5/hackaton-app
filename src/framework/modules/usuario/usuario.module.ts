/* v8 ignore start */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../entities/usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { GET_USUARIO_USE_CASE } from '@/domain/application/symbols/usuario.symbols';
import { buildGetUsuarioUseCase } from '@/domain/application/factories/usuario/get-usuario.use-case.factory';

@Module({
	imports: [
		TypeOrmModule.forFeature([UsuarioEntity]),
	],
	providers: [
		UsuarioRepository,
		{
			provide: GET_USUARIO_USE_CASE,
			inject: [UsuarioRepository],
			useFactory: buildGetUsuarioUseCase
		}
	]
})
export class UsuarioModule {}
/* v8 ignore stop */
