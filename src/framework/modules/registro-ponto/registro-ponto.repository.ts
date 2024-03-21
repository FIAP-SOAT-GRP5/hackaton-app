/* v8 ignore start */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRegistroPontoRepository } from '../../../domain/application/interfaces/registro-ponto/registro-ponto-repository.interface';
import { RegistroPonto } from '../../../domain/enterprise/entities/registro-ponto.entity';
import { RegistroPontoEntity } from '../../entities/registro-ponto.entity';
import { CurrentUser } from '../../model/current-user.model';

@Injectable()
export class RegistroPontoRepository implements IRegistroPontoRepository {
	constructor(
		@InjectRepository(RegistroPontoEntity)
		private readonly registroPontoRepository: Repository<RegistroPontoEntity>
	) {}

	findById(id: number): Promise<RegistroPonto> {
		throw new Error('Method not implemented.');
	}
	registrarPonto(idUsuario: number): Promise<RegistroPonto> {
		throw new Error('Method not implemented.');
	}

	salvar(registroPonto: RegistroPonto): Promise<RegistroPonto> {
		return this.registroPontoRepository.save(registroPonto);
	}

	buscarPorData(
		usuario: CurrentUser,
		data: Date
	): Promise<RegistroPonto | undefined> {
		const query =
			this.registroPontoRepository.createQueryBuilder('registroPonto');
		query.innerJoinAndSelect('registroPonto.usuario', 'usuario');
		query.where('usuario.id = :id', { id: usuario.id });
		query.andWhere('DATE(registroPonto.data) = DATE(:data)', { data });
		return query.getOne();
	}
}
/* v8 ignore stop */
