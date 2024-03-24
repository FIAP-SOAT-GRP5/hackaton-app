import { IEnviarRegistroPontoUseCase } from '../../interfaces/registro-ponto/enviar-registro-ponto.use-case.interface';
import { IEnviarRelRegistroPontoEmailGateway } from '../../interfaces/registro-ponto/enviar-rel-registro-ponto-email.gateway.interface';
import { IRegistroPontoRepository } from '../../interfaces/registro-ponto/registro-ponto-repository.interface';
import { IGetUsuarioUseCase } from '../../interfaces/usuario/get-usuario.repository.use-case.interface';
import { EnviarRegistroPontoUseCase } from '../../use-cases/registro-ponto/enviar-registro-ponto.use-case';

export const buildEnviarRegistroPontoUseCase = (
	repository: IRegistroPontoRepository,
	emailGateway: IEnviarRelRegistroPontoEmailGateway,
	getUsuarioUseCase: IGetUsuarioUseCase,
): IEnviarRegistroPontoUseCase => {
	return new EnviarRegistroPontoUseCase(repository, emailGateway, getUsuarioUseCase);
};
