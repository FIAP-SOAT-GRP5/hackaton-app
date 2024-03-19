/* v8 ignore start */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../entities/usuario.entity';
import { UsuarioRepository } from './usuario.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([UsuarioEntity]),
	],
	providers: [
		UsuarioRepository,
	],
})
export class UsuarioModule {}
/* v8 ignore stop */
