/* v8 ignore start */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildCriarRegistroPontoUseCase } from '../../../domain/application/factories/registro-ponto/create-order.use-case.factory';
import { CREATE_REGISTRO_PONTO_USE_CASE } from '../../../domain/application/symbols/registro-ponto.symbols';
import { RegistroPontoEntity } from '../../entities/registro-ponto.entity';
import { RegistroPontoController } from './registro-ponto.controller';
import { RegistroPontoRepository } from './registro-ponto.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([RegistroPontoEntity]),
	],
	providers: [
		RegistroPontoRepository,
		{
			provide: CREATE_REGISTRO_PONTO_USE_CASE,
			inject: [RegistroPontoRepository],
			useFactory: buildCriarRegistroPontoUseCase,
		},
	],
	controllers: [RegistroPontoController],
})
export class RegistroPontoModule {}
/* v8 ignore stop */
