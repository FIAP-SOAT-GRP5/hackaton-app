/* v8 ignore start */

import { RegistroPonto } from '../../../enterprise/entities/registro-ponto.entity';

export interface ICriarRegistroPontoUseCase {
	registrarPonto(idUsuario: number): Promise<RegistroPonto>;
}
/* v8 ignore stop */
