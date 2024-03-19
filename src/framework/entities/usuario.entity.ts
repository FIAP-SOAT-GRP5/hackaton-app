import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import { IEntity } from '../../domain/application/interfaces/entity.interface';
import { RegistroPontoEntity } from './registro-ponto.entity';

@Entity('usuario')
export class UsuarioEntity implements IEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@ApiProperty()
	nome: string;

	@Column()
	@ApiProperty()
	senha: string;

	@Column()
	@ApiProperty()
	matricula: string;

	@Column()
	@ApiPropertyOptional()
	email?: string;

	@OneToMany(() => RegistroPontoEntity, (item) => item.usuario, {
		cascade: true,
		persistence: true,
	})
	registroPontos?: RegistroPontoEntity[];

	getId(): number {
		return this.id;
	}
}
