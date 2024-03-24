import { Usuario } from '@/domain/enterprise/entities/usuario.entity';
import { IGetUsuarioUseCase } from '../../interfaces/usuario/get-usuario.repository.use-case.interface';
import { IUsuarioRepository } from '../../interfaces/usuario/usuario-repository.interface';

export class GetUsuarioUseCase implements IGetUsuarioUseCase {
	constructor(private readonly repository: IUsuarioRepository) {}

	buscarPorMatricula(matricula: string): Promise<Usuario | undefined> {
		return this.repository.buscarPorMatricula(matricula);
	}
}