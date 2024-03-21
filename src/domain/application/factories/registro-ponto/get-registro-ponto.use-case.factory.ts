import { IGetRegistroPontoUseCase } from '../../interfaces/registro-ponto/get-registro-ponto-repository.use-case.interface';
import { IRegistroPontoRepository } from '../../interfaces/registro-ponto/registro-ponto-repository.interface';
import { GetRegistroPontoUseCase } from '../../use-cases/registro-ponto/get-registro-ponto.use-case copy';

export const buildGetRegistroPontoUseCase = (
	repository: IRegistroPontoRepository
): IGetRegistroPontoUseCase => {
	return new GetRegistroPontoUseCase(repository);
};
