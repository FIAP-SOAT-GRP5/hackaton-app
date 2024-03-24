/* v8 ignore start */
import { RegistroPonto } from '@/domain/enterprise/entities/registro-ponto.entity';
import { UsuarioLogado } from '../../../../framework/model/current-user.model';
import { RelatorioPontoRelDto } from '../../../dto/registro-ponto-rel.dto';

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
	): Promise<RelatorioPontoRelDto[]>;
}
/* v8 ignore stop */
