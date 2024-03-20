/* v8 ignore start */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUsuarioRepository } from '../../../domain/application/interfaces/usuario/usuario-repository.interface';
import { Usuario } from '../../../domain/enterprise/entities/usuario.entity';
import { UsuarioEntity } from '../../entities/usuario.entity';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
	constructor(
		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>
	) {}

	findById(id: number): Promise<Usuario> {
		return this.usuarioRepository.findOne({
			where: {
				id,
			},
		});
	}

}
/* v8 ignore stop */
