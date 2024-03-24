/* v8 ignore start */

import { RelatorioPontoDto } from '@/domain/dto/relatorio-ponto.dto';
import { UsuarioLogado } from '@/framework/model/current-user.model';
import { RegistroPonto } from '../../../enterprise/entities/registro-ponto.entity';

export interface IGetRegistroPontoUseCase {
	findById(id: number): Promise<RegistroPonto>;
	buscarRegistroPontoPorUsuario(
		usuario: UsuarioLogado,
		data?: Date
	): Promise<RelatorioPontoDto[]>;
}
/* v8 ignore stop */
