import { RelatorioPontoDto } from '@/domain/dto/relatorio-ponto.dto';
import { RegistroPonto } from '@/domain/enterprise/entities/registro-ponto.entity';
import { UsuarioLogado } from '@/framework/model/current-user.model';
import { IGetRegistroPontoUseCase } from '../../interfaces/registro-ponto/get-registro-ponto-repository.use-case.interface';
import { IRegistroPontoRepository } from '../../interfaces/registro-ponto/registro-ponto-repository.interface';

export class GetRegistroPontoUseCase implements IGetRegistroPontoUseCase {
	constructor(private readonly repository: IRegistroPontoRepository) {}

	buscarRegistroPontoPorUsuario(
		usuario: UsuarioLogado,
		data?: Date
	): Promise<RelatorioPontoDto[]> {
		return this.repository.buscarRegistroPontoPorUsuario(usuario, data);
	}

	findById(id: number): Promise<RegistroPonto> {
		return this.repository.buscarPorId(id);
	}
}
