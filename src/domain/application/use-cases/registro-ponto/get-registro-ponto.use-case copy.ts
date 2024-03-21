import { RegistroPonto } from '@/domain/enterprise/entities/registro-ponto.entity';
import { IGetRegistroPontoUseCase } from '../../interfaces/registro-ponto/get-registro-ponto-repository.use-case.interface';
import { IRegistroPontoRepository } from '../../interfaces/registro-ponto/registro-ponto-repository.interface';

export class GetRegistroPontoUseCase implements IGetRegistroPontoUseCase {
	constructor(private readonly repository: IRegistroPontoRepository) {}

	findById(id: number): Promise<RegistroPonto> {
		return this.repository.findById(id);
	}
}
