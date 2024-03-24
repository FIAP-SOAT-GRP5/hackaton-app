import { IGetUsuarioUseCase } from "../../interfaces/usuario/get-usuario.repository.use-case.interface";
import { IUsuarioRepository } from "../../interfaces/usuario/usuario-repository.interface";
import { GetUsuarioUseCase } from "../../use-cases/usuario/get-usuario.use-case";

export const buildGetUsuarioUseCase = (
	repository: IUsuarioRepository
): IGetUsuarioUseCase => {
	return new GetUsuarioUseCase(repository);
};
