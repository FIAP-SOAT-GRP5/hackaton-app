/* v8 ignore start */

import { RegistroPonto } from '../../../enterprise/entities/registro-ponto.entity';

export interface IGetRegistroPontoUseCase {
	findById(id: number): Promise<RegistroPonto>;
}
/* v8 ignore stop */