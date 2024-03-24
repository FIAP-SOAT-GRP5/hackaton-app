import {
	Controller,
	Get,
	Inject,
	Post,
	Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { IEnviarRegistroPontoUseCase } from '@/domain/application/interfaces/registro-ponto/enviar-registro-ponto.use-case.interface';
import {
	CREATE_REGISTRO_PONTO_USE_CASE,
	ENVIAR_REGISTRO_PONTO_USE_CASE,
} from '@/domain/application/symbols/registro-ponto.symbols';

import { ReqCurrentUser } from '@/framework/decorators/current-user.decorator';
import { UsuarioLogado } from '@/framework/model/current-user.model';
import { ICriarRegistroPontoUseCase } from '../../../domain/application/interfaces/registro-ponto/criar-registro-ponto.use-case.interface';
import { AuthJwt } from '../../decorators/auth-jwt.decorator';

@ApiTags('Registro de Ponto')
@Controller('registro-ponto')
export class RegistroPontoController {
	constructor(
		@Inject(ENVIAR_REGISTRO_PONTO_USE_CASE)
		private readonly getRegistroPontoUseCase: IEnviarRegistroPontoUseCase,
		@Inject(CREATE_REGISTRO_PONTO_USE_CASE)
		private readonly createIRegistroPontoUseCase: ICriarRegistroPontoUseCase
	) {}

	@Post()
	@AuthJwt()
	public async registrarPonto(
		@Res() res: Response,
		@ReqCurrentUser() usuarioLogado: UsuarioLogado
	): Promise<void> {
		try {
			const createdPonto = await this.createIRegistroPontoUseCase.registrar(
				usuarioLogado
			);

			res.status(201).send(createdPonto);
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Get('/relatorio')
	@AuthJwt()
	public async relatorioPorUsuario(
		@Res() res: Response,
		@ReqCurrentUser() usuarioLogado: UsuarioLogado
	): Promise<void> {
		try {
			const registros =
				await this.getRegistroPontoUseCase.enviarRegistroPontoPorUsuario(
					usuarioLogado
				);

			res.status(200).send({ registros });
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
}
