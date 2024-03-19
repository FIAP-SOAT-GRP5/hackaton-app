/* v8 ignore start */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroPontoEntity } from '../../entities/registro-ponto.entity';
import { RegistroPontoRepository } from './registro-ponto.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([RegistroPontoEntity]),
	],
	providers: [
		RegistroPontoRepository,
	],
})
export class UsuarioModule {}
/* v8 ignore stop */
