import { IEnviarRegistroPontoUseCase } from '../../interfaces/registro-ponto/enviar-registro-ponto.use-case.interface';
import { IEnviarRelRegistroPontoEmailGateway } from '../../interfaces/registro-ponto/enviar-rel-registro-ponto-email.gateway.interface';
import { IRegistroPontoRepository } from '../../interfaces/registro-ponto/registro-ponto-repository.interface';
import { EnviarRegistroPontoUseCase } from '../../use-cases/registro-ponto/enviar-registro-ponto.use-case';

export const buildGetRegistroPontoUseCase = (
	repository: IRegistroPontoRepository,
	emailGateway: IEnviarRelRegistroPontoEmailGateway,
): IEnviarRegistroPontoUseCase => {
	return new EnviarRegistroPontoUseCase(repository, emailGateway);
};
