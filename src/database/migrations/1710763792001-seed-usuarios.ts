/* v8 ignore start */
import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { UsuarioEntity } from '../../framework/entities/usuario.entity';

export class SeedUsuarios1686015227728 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const repository = await queryRunner.connection.getRepository(UsuarioEntity);

		const maxUsuarios = 10000;

		const defaultPassword = await hash('Mudar.123', 10);

		const usuarios: UsuarioEntity[] = [];

		for (let i = 0; i < maxUsuarios; i++) {
			const usuario = new UsuarioEntity();
			usuario.nome = faker.person.fullName();
			usuario.matricula = `${i}`.padStart(7, '0');
			usuario.email = faker.internet.email();
			usuario.senha = defaultPassword;
			usuarios.push(usuario);
		}

		await repository.insert(usuarios);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.connection.getRepository(UsuarioEntity).clear();
	}
}

/* v8 ignore stop */
