import { IEntity } from '../../application/interfaces/entity.interface';
import { Usuario } from './usuario.entity';

export class RegistroPonto implements IEntity {
	id: number;
	usuario: Usuario;
	dataChegada?: Date;
	dataSaidaAlmoco?: Date;
	dataChegadaAlmoco?: Date;
	dataSaida?: Date;

	getId(): number {
		return this.id;
	}
}
