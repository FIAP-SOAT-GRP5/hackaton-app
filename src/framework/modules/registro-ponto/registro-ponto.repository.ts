/* v8 ignore start */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegistroPonto } from '../../../domain/enterprise/entities/registro-ponto.entity';
import { RegistroPontoEntity } from '../../entities/registro-ponto.entity';

import { IRegistroPontoRepository } from '@/domain/application/interfaces/registro-ponto/registro-ponto-repository.interface';
import { RelatorioPontoRelDto } from '../../../domain/dto/registro-ponto-rel.dto';
import { UsuarioLogado } from '../../model/current-user.model';

@Injectable()
export class RegistroPontoRepository implements IRegistroPontoRepository {
	constructor(
		@InjectRepository(RegistroPontoEntity)
		private readonly registroPontoRepository: Repository<RegistroPontoEntity>,


	) {}

	salvar(registroPonto: RegistroPonto): Promise<RegistroPonto> {
		return this.registroPontoRepository.save(registroPonto);
	}

	buscarPorData(
		usuario: UsuarioLogado,
		data: Date
	): Promise<RegistroPonto | undefined> {
		const query =
			this.registroPontoRepository.createQueryBuilder('registroPonto');
		query.innerJoinAndSelect('registroPonto.usuario', 'usuario');
		query.where('usuario.id = :id', { id: usuario.id });
		query.andWhere('DATE(registroPonto.data) = DATE(:data)', { data });
		return query.getOne();
	}

	buscarPorId(id: number): Promise<RegistroPonto> {
		return this.registroPontoRepository.findOne({
			where: {
				id,
			},
		});
	}

	async buscarRegistroPontoPorUsuario(
		usuario: UsuarioLogado
	): Promise<RelatorioPontoRelDto[]> {
		const registros = await this.registroPontoRepository
			.createQueryBuilder('registro_ponto')
			.select([
				'registro_ponto.id AS id',
				'registro_ponto.data AS data',
				'registro_ponto.horaChegada AS horaChegada',
				'registro_ponto.horaSaidaAlmoco AS horaSaidaAlmoco',
				'registro_ponto.horaChegadaAlmoco AS horaChegadaAlmoco',
				'registro_ponto.horaSaida AS horaSaida',
				'(TIME_TO_SEC(TIMEDIFF(registro_ponto.horaSaida, registro_ponto.horaChegada)) / 3600) AS horasTrabalhadas',
				'(TIME_TO_SEC(TIMEDIFF(registro_ponto.horaChegadaAlmoco, registro_ponto.horaSaidaAlmoco)) / 3600) AS horasDeAlmoco',
			])
			.where('registro_ponto.usuario_id = :idUsuario', { idUsuario: usuario.id })
			.getRawMany<RelatorioPontoRelDto>();

		return registros;
	}
}
