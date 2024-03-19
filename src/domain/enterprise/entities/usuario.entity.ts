import { IEntity } from '../../application/interfaces/entity.interface';

export class Usuario implements IEntity {
	id: number;
	nome: string;
	matricula: string;
	email?: string;
	senha?: string;

	getId(): number {
		return this.id;
	}
}
