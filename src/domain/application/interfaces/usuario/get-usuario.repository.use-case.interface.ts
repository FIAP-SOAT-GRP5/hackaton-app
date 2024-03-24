/* v8 ignore start */
import { Usuario } from '../../../enterprise/entities/usuario.entity';

export interface IGetUsuarioUseCase {
	buscarPorMatricula(matricula: string): Promise<Usuario>;
}
/* v8 ignore stop */
