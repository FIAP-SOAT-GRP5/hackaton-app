/* v8 ignore start */

import { Usuario } from '../../../enterprise/entities/usuario.entity';

export interface IUsuarioRepository {
	findById(id: number): Promise<Usuario>;
}
/* v8 ignore stop */
