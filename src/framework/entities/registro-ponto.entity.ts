import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
	@ApiProperty()
	id: number;

	@Column()
	@ApiProperty()
	data: Date;

	@Column()
	@ApiPropertyOptional()
	horaChegada?: Date;

	@Column()
	@ApiPropertyOptional()
	horaSaidaAlmoco?: Date;

	@Column()
	@ApiPropertyOptional()
	horaChegadaAlmoco?: Date;

	@Column()
	@ApiPropertyOptional()
	horaSaida?: Date;

	@ManyToOne(() => UsuarioEntity, (item) => item.registroPontos)
	usuario: UsuarioEntity;

	getId(): number {
		return this.id;
	}
}
