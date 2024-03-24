/* v8 ignore start */

import { RelatorioPontoDto } from '@/domain/dto/relatorio-ponto.dto';
import { UsuarioLogado } from '@/framework/model/current-user.model';

export interface IEnviarRelRegistroPontoEmailGateway {
	envioRelatorioPonto(
		usuario: UsuarioLogado,
		registros: RelatorioPontoDto[]
	): Promise<void>;
}
/* v8 ignore stop */
