import { JwtService } from "@nestjs/jwt";
import { IAutenticarUsuarioUseCase } from "../../interfaces/autenticacao/autenticar-usuario.use-case.interface";
import { IUsuarioRepository } from "../../interfaces/usuario/usuario-repository.interface";
import { AutenticarUsuarioUseCase } from "../../use-cases/auth/autenticar-usuario.use-case";

export const buildAutenticarUsuarioUseCase = (
	repository: IUsuarioRepository,
	jwtService: JwtService
): IAutenticarUsuarioUseCase => {
	return new AutenticarUsuarioUseCase(repository, jwtService);
};
