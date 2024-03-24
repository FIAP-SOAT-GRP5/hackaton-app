/* v8 ignore start */
import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import { DateTime } from 'luxon';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { RegistroPontoEntity } from '../../framework/entities/registro-ponto.entity';
import { UsuarioEntity } from '../../framework/entities/usuario.entity';

export class SeedUsuarios1686015227728 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const usuarioRepository = await queryRunner.connection.getRepository(UsuarioEntity);

		const maxUsuarios = 1000;
		const maxRegistrosPontosMesPassado = DateTime.now().minus({ months: 1 }).daysInMonth;
		const mesPassado = DateTime.now().minus({ months: 1 });

		const defaultPassword = await hash('Mudar.123', 10);

		for (let i = 0; i < maxUsuarios; i++) {
			const usuario = new UsuarioEntity();
			usuario.registroPontos = [];
			usuario.nome = faker.person.fullName();
			usuario.matricula = `${i}`.padStart(7, '0');
			usuario.email = faker.internet.email();
			usuario.senha = defaultPassword;
			for (let j = 0; j < maxRegistrosPontosMesPassado; j++) {
				const registroPonto = new RegistroPontoEntity();
				const diaAtual = mesPassado.plus({ days: j });
				if (diaAtual.weekday > 5) continue;
				registroPonto.usuario = usuario;
				registroPonto.data = diaAtual.toJSDate();
				registroPonto.horaChegada = diaAtual.set({ hour: 8, minute: 0 }).toJSDate();
				registroPonto.horaSaidaAlmoco = diaAtual.set({ hour: 12, minute: 0 }).toJSDate();
				registroPonto.horaChegadaAlmoco = diaAtual.set({ hour: 13, minute: 0 }).toJSDate();
				registroPonto.horaSaida = diaAtual.set({ hour: 17, minute: 0 }).toJSDate();
				usuario.registroPontos.push(registroPonto);
			}
			await usuarioRepository.save(usuario);
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.connection.getRepository(UsuarioEntity).clear();
	}
}

/* v8 ignore stop */
