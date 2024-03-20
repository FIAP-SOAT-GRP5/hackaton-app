import {
	Controller,
	Inject,
	Post,
	Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ICriarRegistroPontoUseCase } from '../../../domain/application/interfaces/registro-ponto/criar-registro-ponto.use-case.interface';
import { CREATE_REGISTRO_PONTO_USE_CASE } from '../../../domain/application/symbols/registro-ponto.symbols';
import { AuthJwt } from '../../decorators/auth-jwt.decorator';
import { ReqCurrentUser } from '../../decorators/current-user.decorator';
import { CurrentUser } from '../../model/current-user.model';

@Controller('registro-ponto')
@ApiTags('RegistroPonto')
export class RegistroPontoController {
	constructor(
		@Inject(CREATE_REGISTRO_PONTO_USE_CASE)
		private readonly createRegistroPontoUseCase: ICriarRegistroPontoUseCase,
	) {}

	@Post()
	@AuthJwt()
	public async create(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Res() res: Response,
	): Promise<void> {
		try {
			const registroponto = await this.createRegistroPontoUseCase.registrar(currentUser);
			res.status(201).send({ registroponto });
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
}
