import { IEntity } from '../../application/interfaces/entity.interface';
import { Usuario } from './usuario.entity';

export class RegistroPonto implements IEntity {
	id: number;
	usuario: Usuario;

	data: Date;
	horaChegada?: Date;
	horaSaidaAlmoco?: Date;
	horaChegadaAlmoco?: Date;
	horaSaida?: Date;

	getId(): number {
		return this.id;
	}
}
