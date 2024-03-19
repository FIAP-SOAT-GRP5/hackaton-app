import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { IEntity } from '../../domain/application/interfaces/entity.interface';
import { UsuarioEntity } from './usuario.entity';

@Entity('registro_ponto')
export class RegistroPontoEntity implements IEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@ApiPropertyOptional()
	dataChegada?: Date;

	@Column()
	@ApiPropertyOptional()
	dataSaidaAlmoco?: Date;

	@Column()
	@ApiPropertyOptional()
	dataChegadaAlmoco?: Date;

	@Column()
	@ApiPropertyOptional()
	dataSaida?: Date;

	@ManyToOne(() => UsuarioEntity, (item) => item.registroPontos)
	usuario: UsuarioEntity;

	getId(): number {
		return this.id;
	}
}
