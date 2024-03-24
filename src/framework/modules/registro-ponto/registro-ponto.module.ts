/* v8 ignore start */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { buildEnviarRegistroPontoUseCase } from '@/domain/application/factories/registro-ponto/enviar-registro-ponto.use-case.factory';
import {
	CREATE_REGISTRO_PONTO_USE_CASE,
	ENVIAR_REGISTRO_PONTO_USE_CASE,
} from '@/domain/application/symbols/registro-ponto.symbols';

import { buildCriarRegistroPontoUseCase } from '@/domain/application/factories/registro-ponto/create-order.use-case.factory';
import { RegistroPontoEntity } from '../../entities/registro-ponto.entity';
import { RegistroPontoController } from './registro-ponto.controller';
import { RegistroPontoRepository } from './registro-ponto.repository';

import { GET_USUARIO_USE_CASE } from '../../../domain/application/symbols/usuario.symbols';
import { EmailRepository } from '../email/email.gateway';
import { EmailModule } from '../email/email.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
	imports: [TypeOrmModule.forFeature([RegistroPontoEntity]), EmailModule, UsuarioModule],
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
			inject: [RegistroPontoRepository, EmailRepository, GET_USUARIO_USE_CASE],
			useFactory: buildEnviarRegistroPontoUseCase,
		},
	],
	controllers: [RegistroPontoController],
})
export class RegistroPontoModule {}
/* v8 ignore stop */
