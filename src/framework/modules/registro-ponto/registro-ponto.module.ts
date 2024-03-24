/* v8 ignore start */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { buildGetRegistroPontoUseCase } from '@/domain/application/factories/registro-ponto/get-registro-ponto.use-case.factory';
import {
	CREATE_REGISTRO_PONTO_USE_CASE,
	GET_REGISTRO_PONTO_USE_CASE,
} from '@/domain/application/symbols/registro-ponto.symbols';

import { buildCriarRegistroPontoUseCase } from '@/domain/application/factories/registro-ponto/create-order.use-case.factory';
import { RegistroPontoEntity } from '../../entities/registro-ponto.entity';
import { RegistroPontoController } from './registro-ponto.controller';
import { RegistroPontoRepository } from './registro-ponto.repository';

import { EmailModule } from '../email/email.module';
import { EmailRepository } from '../email/email.respository';

@Module({
	imports: [TypeOrmModule.forFeature([RegistroPontoEntity]), EmailModule],
	providers: [
		EmailRepository,
		RegistroPontoRepository,
		{
			provide: CREATE_REGISTRO_PONTO_USE_CASE,
			inject: [RegistroPontoRepository],
			useFactory: buildCriarRegistroPontoUseCase,
		},
		{
			provide: GET_REGISTRO_PONTO_USE_CASE,
			inject: [RegistroPontoRepository],
			useFactory: buildGetRegistroPontoUseCase,
		},
	],
	controllers: [RegistroPontoController],
})
export class RegistroPontoModule {}
/* v8 ignore stop */
