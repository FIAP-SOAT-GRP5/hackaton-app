import {
	Body,
	Controller,
	Inject,
	Post,
	Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IAutenticarUsuarioUseCase } from '@/domain/application/interfaces/autenticacao/autenticar-usuario.use-case.interface';
import { AUTENTICAR_USUARIO_USE_CASE } from '@/domain/application/symbols/usuario.symbols';
import { AutenticarUsuarioDTO } from '@/domain/dto/autenticar-usuario.dto';

@ApiTags('Autenticação')
@Controller('autenticacao')
export class AuthController {
	constructor(
		@Inject(AUTENTICAR_USUARIO_USE_CASE)
		private readonly autenticarUsuarioUseCase: IAutenticarUsuarioUseCase
	) {}

	@Post()
	public async autenticarUsuario(
		@Res() res: Response,
		@Body() autenticarUsuarioDto: AutenticarUsuarioDTO
	): Promise<void> {
		try {
			const token = await this.autenticarUsuarioUseCase.autenticarUsuario(autenticarUsuarioDto.matricula, autenticarUsuarioDto.senha);
			res.status(200).send(token);
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
}
