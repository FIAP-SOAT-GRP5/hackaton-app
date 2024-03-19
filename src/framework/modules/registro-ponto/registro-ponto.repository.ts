/* v8 ignore start */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRegistroPontoRepository } from '../../../domain/application/interfaces/order/registro-ponto-repository.interface';
import { RegistroPonto } from '../../../domain/enterprise/entities/registro-ponto.entity';
import { RegistroPontoEntity } from '../../entities/registro-ponto.entity';

@Injectable()
export class RegistroPontoRepository implements IRegistroPontoRepository {
	constructor(
		@InjectRepository(RegistroPontoEntity)
		private readonly registroPontoRepository: Repository<RegistroPontoEntity>
	) {}

	findById(id: number): Promise<RegistroPonto> {
		return this.registroPontoRepository.findOne({
			where: {
				id,
			},
			relations: ['usuario'],
		});
	}

}
/* v8 ignore stop */
