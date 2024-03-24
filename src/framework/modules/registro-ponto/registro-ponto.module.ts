/* v8 ignore start */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { buildGetRegistroPontoUseCase } from '@/domain/application/factories/registro-ponto/enviar-registro-ponto.use-case.factory';
import {
	CREATE_REGISTRO_PONTO_USE_CASE,
	ENVIAR_REGISTRO_PONTO_USE_CASE,
} from '@/domain/application/symbols/registro-ponto.symbols';

import { buildCriarRegistroPontoUseCase } from '@/domain/application/factories/registro-ponto/create-order.use-case.factory';
import { RegistroPontoEntity } from '../../entities/registro-ponto.entity';
import { RegistroPontoController } from './registro-ponto.controller';
import { RegistroPontoRepository } from './registro-ponto.repository';

import { EmailRepository } from '../email/email.gateway';
import { EmailModule } from '../email/email.module';

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
			provide: ENVIAR_REGISTRO_PONTO_USE_CASE,
			inject: [RegistroPontoRepository, EmailRepository],
			useFactory: buildGetRegistroPontoUseCase,
		},
	],
	controllers: [RegistroPontoController],
})
export class RegistroPontoModule {}
/* v8 ignore stop */
