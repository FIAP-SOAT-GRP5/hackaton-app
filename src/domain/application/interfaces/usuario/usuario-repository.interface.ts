/* v8 ignore start */

import { Usuario } from '../../../enterprise/entities/usuario.entity';

export interface IUsuarioRepository {
	buscarPorId(id: number): Promise<Usuario>;
	buscarPorMatricula(matricula: string): Promise<Usuario>;
}
/* v8 ignore stop */
