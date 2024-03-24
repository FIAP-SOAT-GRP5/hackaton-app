/* v8 ignore start */

import { RelatorioPontoDto } from '@/domain/dto/relatorio-ponto.dto';
import { UsuarioLogado } from '@/framework/model/current-user.model';

export interface IEnviarRegistroPontoUseCase {
	enviarRegistroPontoPorUsuario(
		usuario: UsuarioLogado,
		data?: Date
	): Promise<RelatorioPontoDto[]>;
}
/* v8 ignore stop */
