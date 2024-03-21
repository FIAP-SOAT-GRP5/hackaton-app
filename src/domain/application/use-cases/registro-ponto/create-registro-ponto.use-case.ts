import { RegistroPonto } from '../../../enterprise/entities/registro-ponto.entity';
import { ICriarRegistroPontoUseCase } from '../../interfaces/registro-ponto/criar-registro-ponto.use-case.interface';
import { IRegistroPontoRepository } from '../../interfaces/registro-ponto/registro-ponto-repository.interface';

export class CriarRegistroPontoUseCase implements ICriarRegistroPontoUseCase {
	constructor(private readonly repository: IRegistroPontoRepository) {}

	registrarPonto(idUsuario: number): Promise<RegistroPonto> {
		return this.repository.registrarPonto(idUsuario);
	}
}
