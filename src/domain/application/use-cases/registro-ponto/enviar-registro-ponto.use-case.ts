import { RelatorioPontoDto } from '@/domain/dto/relatorio-ponto.dto';
import { UsuarioLogado } from '@/framework/model/current-user.model';
import { IEnviarRegistroPontoUseCase } from '../../interfaces/registro-ponto/enviar-registro-ponto.use-case.interface';
import { IEnviarRelRegistroPontoEmailGateway } from '../../interfaces/registro-ponto/enviar-rel-registro-ponto-email.gateway.interface';
import { IRegistroPontoRepository } from '../../interfaces/registro-ponto/registro-ponto-repository.interface';

export class EnviarRegistroPontoUseCase implements IEnviarRegistroPontoUseCase {
	constructor(
		private readonly repository: IRegistroPontoRepository,
		private readonly emailRepository: IEnviarRelRegistroPontoEmailGateway,
	) {}

	async enviarRegistroPontoPorUsuario(
		usuario: UsuarioLogado,
		data?: Date
	): Promise<RelatorioPontoDto[]> {
		const registros = await this.repository.buscarRegistroPontoPorUsuario(usuario, data);

		const relatorioPonto = registros.map((item) => ({
			data: item.data,
			horaChegada: item.horaChegada,
			horaSaidaAlmoco: item.horaSaidaAlmoco,
			horaChegadaAlmoco: item.horaChegadaAlmoco,
			horaSaida: item.horaSaida,
			horasTrabalhadas:
				parseFloat(item.horasTrabalhadas) - parseFloat(item.horasDeAlmoco),
		}));

		await this.emailRepository.envioRelatorioPonto(usuario, relatorioPonto);
		return relatorioPonto;
	}

}
