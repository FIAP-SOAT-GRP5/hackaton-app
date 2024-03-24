/* v8 ignore start */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegistroPonto } from '../../../domain/enterprise/entities/registro-ponto.entity';
import { RegistroPontoEntity } from '../../entities/registro-ponto.entity';

import { IRegistroPontoRepository } from '@/domain/application/interfaces/registro-ponto/registro-ponto-repository.interface';
import { RelatorioPontoDto } from '@/domain/dto/relatorio-ponto.dto';
import { UsuarioLogado } from '../../model/current-user.model';
import { EmailRepository } from '../email/email.respository';

@Injectable()
export class RegistroPontoRepository implements IRegistroPontoRepository {
	constructor(
		@InjectRepository(RegistroPontoEntity)
		private readonly registroPontoRepository: Repository<RegistroPontoEntity>,

		private readonly emailRepository: EmailRepository
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
	): Promise<RelatorioPontoDto[]> {
		const registros = await this.registroPontoRepository
			.createQueryBuilder('registro_ponto')
			.select([
				'registro_ponto.id',
				'registro_ponto.data',
				'registro_ponto.horaChegada',
				'registro_ponto.horaSaidaAlmoco',
				'registro_ponto.horaChegadaAlmoco',
				'registro_ponto.horaSaida',
				'(TIME_TO_SEC(TIMEDIFF(registro_ponto.horaSaida, registro_ponto.horaChegada)) / 3600) AS horasTrabalhadas',
				'(TIME_TO_SEC(TIMEDIFF(registro_ponto.horaChegadaAlmoco, registro_ponto.horaSaidaAlmoco)) / 3600) AS horasDeAlmoco',
			])
			.where('registro_ponto.usuario_id = :idUsuario', { idUsuario: usuario.id })
			.getRawMany();

		const relatorioPonto = registros.map((item) => ({
			data: item.registro_ponto_data,
			horaChegada: item.registro_ponto_hora_chegada,
			horaSaidaAlmoco: item.registro_ponto_hora_saida_almoco,
			horaChegadaAlmoco: item.registro_ponto_hora_chegada_almoco,
			horaSaida: item.registro_ponto_hora_saida,
			horasTrabalhadas:
				parseFloat(item.horasTrabalhadas) - parseFloat(item.horasDeAlmoco),
		}));

		this.emailRepository.envioRelatorioPonto(usuario, relatorioPonto);

		return relatorioPonto;
	}
}
