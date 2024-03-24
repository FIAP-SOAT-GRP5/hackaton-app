/* v8 ignore start */

import { RelatorioPontoDto } from '@/domain/dto/relatorio-ponto.dto';
import { Usuario } from '../../../enterprise/entities/usuario.entity';

export interface IEnviarRelRegistroPontoEmailGateway {
	envioRelatorioPonto(
		usuario: Usuario,
		registros: RelatorioPontoDto[]
	): Promise<void>;
}
/* v8 ignore stop */
