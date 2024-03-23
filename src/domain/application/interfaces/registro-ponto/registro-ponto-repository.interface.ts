/* v8 ignore start */
import { RelatorioPontoDto } from '@/domain/dto/relatorio-ponto.dto';
import { RegistroPonto } from '@/domain/enterprise/entities/registro-ponto.entity';
import { UsuarioLogado } from '../../../../framework/model/current-user.model';

export interface IRegistroPontoRepository {
	salvar(registroPonto: RegistroPonto): Promise<RegistroPonto>;
	buscarPorData(
		usuario: UsuarioLogado,
		data: Date
	): Promise<RegistroPonto | undefined>;
	buscarPorId(id: number): Promise<RegistroPonto>;
	buscarRegistroPontoPorUsuario(
		usuario: UsuarioLogado,
		data?: Date
	): Promise<RelatorioPontoDto[]>;
}
/* v8 ignore stop */
