import { ICriarRegistroPontoUseCase } from "../../interfaces/registro-ponto/criar-registro-ponto.use-case.interface";
import { IRegistroPontoRepository } from "../../interfaces/registro-ponto/registro-ponto-repository.interface";
import { CriarRegistroPontoUseCase } from "../../use-cases/registro-ponto/create-registro-ponto.use-case";

export const buildCriarRegistroPontoUseCase = (
	repository: IRegistroPontoRepository,
): ICriarRegistroPontoUseCase => {
	return new CriarRegistroPontoUseCase(repository);
};
