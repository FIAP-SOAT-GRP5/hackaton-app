import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
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

	@Column({ name: 'usuario_id' })
	@ApiProperty()
	usuario_id: number;

	@ManyToOne(() => UsuarioEntity, (item) => item.registroPontos)
	@JoinColumn({ name: 'usuario_id' })
	usuario: UsuarioEntity;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	getId(): number {
		return this.id;
	}
}
