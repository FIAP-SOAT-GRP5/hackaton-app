/* v8 ignore start */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getIntId } from '../utils/migration';

export class Initial1686015227728 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'usuario',
				columns: [
					getIntId(),
					{
						name: 'nome',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'matricula',
						type: 'varchar',
						isNullable: false,
						isUnique: true,
					},
					{
						name: 'email',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'senha',
						type: 'varchar',
						isNullable: false,
					},
				],
			}),
			true
		);

		await queryRunner.createTable(
			new Table({
				name: 'registro_ponto',
				columns: [
					getIntId(),
					{
						name: 'usuario_id',
						type: 'int',
						isNullable: false,
						unsigned: true,
					},
					{
						name: 'data',
						type: 'date',
						isNullable: false,
					},
					{
						name: 'hora_chegada',
						type: 'time',
						isNullable: true,
					},
					{
						name: 'hora_saida_almoco',
						type: 'time',
						isNullable: true,
					},
					{
						name: 'hora_chegada_almoco',
						type: 'time',
						isNullable: true,
					},
					{
						name: 'hora_saida',
						type: 'time',
						isNullable: true,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						columnNames: ['usuario_id'],
						referencedTableName: 'usuario',
						referencedColumnNames: ['id'],
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE',
						name: 'fk_registro_ponto_usuario',
					},
				],
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('registro_ponto');
		await queryRunner.dropTable('usuario');
	}
}

/* v8 ignore stop */
