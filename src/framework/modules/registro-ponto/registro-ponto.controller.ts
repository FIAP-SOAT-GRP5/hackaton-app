import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { ICreateRegistroPontoUseCase } from '@/domain/application/interfaces/registro-ponto/create-registro-ponto-repository.use-case.interface';
import { IGetRegistroPontoUseCase } from '@/domain/application/interfaces/registro-ponto/get-registro-ponto-repository.use-case.interface';
import {
	CREATE_REGISTRO_PONTO_USE_CASE,
	GET_REGISTRO_PONTO_USE_CASE,
} from '@/domain/application/symbols/registro-ponto.symbols';

import { ReqCurrentUser } from '@/framework/decorators/current-user.decorator';
import { CurrentUser } from '@/framework/model/current-user.model';
import { AuthJwt } from '../../decorators/auth-jwt.decorator';

@ApiTags('Registro de Ponto')
@Controller('registro-ponto')
export class RegistroPontoController {
	constructor(
		@Inject(GET_REGISTRO_PONTO_USE_CASE)
		private readonly getRegistroPontoUseCase: IGetRegistroPontoUseCase,
		@Inject(CREATE_REGISTRO_PONTO_USE_CASE)
		private readonly createIRegistroPontoUseCase: ICreateRegistroPontoUseCase
	) {}

	@Post()
	@AuthJwt()
	public async registrarPonto(
		@Res() res: Response,
		@ReqCurrentUser() usuarioLogado: CurrentUser
	): Promise<void> {
		try {
			const createdPonto = await this.createIRegistroPontoUseCase.registrarPonto(
				usuarioLogado.id
			);

			res.status(201).send(createdPonto);
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Get('/relatorio-por-usuario/:id')
	@AuthJwt()
	public async relatorioPorUsuario(
		@Res() res: Response,
		@Param('id', ParseIntPipe) id: number,
		@ReqCurrentUser() usuarioLogado: CurrentUser
	): Promise<void> {
		try {
			if (usuarioLogado.id != id) {
				throw new HttpException(
					'Usuário não tem permissão para acessar este recurso',
					HttpStatus.FORBIDDEN
				);
			}

			const registro =
				await this.getRegistroPontoUseCase.buscarRegistroPontoPorUsuario(id);

			if (!registro) {
				res.status(200).send({ registro: [] });
			} else {
				res.status(200).send(registro);
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
}
