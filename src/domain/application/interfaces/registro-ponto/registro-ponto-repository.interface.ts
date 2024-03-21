/* v8 ignore start */
import { RegistroPonto } from '@/domain/enterprise/entities/registro-ponto.entity';
import { CurrentUser } from '../../../../framework/model/current-user.model';

export interface IRegistroPontoRepository {
	salvar(registroPonto: RegistroPonto): Promise<RegistroPonto>;
	buscarPorData(
		usuario: CurrentUser,
		data: Date
	): Promise<RegistroPonto | undefined>;

	findById(id: number): Promise<RegistroPonto>;
	registrarPonto(idUsuario: number): Promise<RegistroPonto>;
}
/* v8 ignore stop */
