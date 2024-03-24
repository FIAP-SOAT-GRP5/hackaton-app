import { UsuarioLogado } from '../../../../framework/model/current-user.model';
import { RegistroPonto } from '../../../enterprise/entities/registro-ponto.entity';

/* v8 ignore start */
export interface ICriarRegistroPontoUseCase {
	registrar(usuario: UsuarioLogado): Promise<RegistroPonto>;
}
/* v8 ignore stop */
