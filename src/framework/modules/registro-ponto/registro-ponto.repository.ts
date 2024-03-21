/* v8 ignore start */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { RegistroPonto } from '../../../domain/enterprise/entities/registro-ponto.entity';
import { RegistroPontoEntity } from '../../entities/registro-ponto.entity';

import { IRegistroPontoRepository } from '@/domain/application/interfaces/registro-ponto/registro-ponto-repository.interface';
import { CreateBaterPontoDTO } from '@/domain/dto/create-bater-ponto.dto';
import { DateTime } from 'luxon';

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
		});
	}

	async registrarPonto(idUsuario: number): Promise<RegistroPonto> {
		try {
			const novoPonto = await this.criarPonto(idUsuario);
			const pontoRegistrado = await this.buscarRegistroPontoPorUsuarioData(
				idUsuario,
				new Date()
			);

			if (!pontoRegistrado) {
				return await this.salvarNovoRegistroPonto(novoPonto);
			}

			this.atualizarHorariosPonto(novoPonto, pontoRegistrado);

			if (this.todosPontosRegistrados(pontoRegistrado)) {
				throw new Error('Todos os pontos já foram registrados para este usuário.');
			}

			return await this.atualizarRegistroPonto(pontoRegistrado, novoPonto);
		} catch (error) {
			throw new Error('Erro ao bater ponto: ' + error.message);
		}
	}

	async buscarRegistroPontoPorUsuario(
		idUsuario: number
	): Promise<RegistroPonto[]> {
		const where: any = { usuario: { id: idUsuario } };
		console.log(await this.registroPontoRepository.find({ where }));

		return await this.registroPontoRepository.find({ where });
	}

	private async buscarRegistroPontoPorUsuarioData(
		idUsuario: number,
		data?: Date
	): Promise<RegistroPonto> {
		const where: any = { usuario: { id: idUsuario } };

		if (data) {
			const startDate = new Date(data);
			startDate.setHours(0, 0, 0, 0);

			const endDate = new Date(data);
			endDate.setHours(23, 59, 59, 999);

			where.data = Between(startDate, endDate);
		}

		console.log(await this.registroPontoRepository.findOne({ where }));

		return await this.registroPontoRepository.findOne({ where });
	}

	private async criarPonto(idUsuario: number): Promise<CreateBaterPontoDTO> {
		const dataAtual = DateTime.now();
		return {
			data: dataAtual.toJSDate(),
			usuario_id: idUsuario,
			horaChegada: dataAtual.toJSDate(),
			horaSaidaAlmoco: null,
			horaChegadaAlmoco: null,
			horaSaida: null,
		};
	}

	private async salvarNovoRegistroPonto(
		ponto: CreateBaterPontoDTO
	): Promise<RegistroPonto> {
		return await this.registroPontoRepository.save(ponto);
	}

	private async atualizarRegistroPonto(
		registroPonto: RegistroPonto,
		ponto: CreateBaterPontoDTO
	): Promise<RegistroPonto> {
		return await this.registroPontoRepository.save({
			id: registroPonto.id,
			horaChegada: registroPonto.horaChegada,
			...ponto,
		});
	}

	private atualizarHorariosPonto(
		ponto: CreateBaterPontoDTO,
		registroPonto: RegistroPonto
	): void {
		if (registroPonto.horaChegada && !registroPonto.horaSaidaAlmoco) {
			ponto.horaSaidaAlmoco = new Date();
		} else {
			ponto.horaSaidaAlmoco = registroPonto.horaSaidaAlmoco;
		}

		if (
			registroPonto.horaChegada &&
			registroPonto.horaSaidaAlmoco &&
			!registroPonto.horaChegadaAlmoco
		) {
			ponto.horaChegadaAlmoco = new Date();
		} else {
			ponto.horaChegadaAlmoco = registroPonto.horaChegadaAlmoco;
		}

		if (
			registroPonto.horaChegada &&
			registroPonto.horaSaidaAlmoco &&
			registroPonto.horaChegadaAlmoco &&
			!registroPonto.horaSaida
		) {
			ponto.horaSaida = new Date();
		} else {
			ponto.horaSaida = registroPonto.horaSaida;
		}
	}

	private todosPontosRegistrados(registroPonto: RegistroPonto): boolean {
		return (
			registroPonto.horaChegada !== null &&
			registroPonto.horaSaidaAlmoco !== null &&
			registroPonto.horaChegadaAlmoco !== null &&
			registroPonto.horaSaida !== null
		);
	}
}
/* v8 ignore stop */
