/* v8 ignore start */
import { RegistroPonto } from '@/domain/enterprise/entities/registro-ponto.entity';

export interface IRegistroPontoRepository {
	findById(id: number): Promise<RegistroPonto>;
	buscarRegistroPontoPorUsuario(
		idUsuario: number,
		data?: Date
	): Promise<RegistroPonto[]>;

	registrarPonto(idUsuario: number): Promise<RegistroPonto>;
}
/* v8 ignore stop */
