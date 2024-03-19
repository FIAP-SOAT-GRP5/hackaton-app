import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from './config/database';
import { AuthModule } from './framework/modules/auth/auth.module';
import { UsuarioModule } from './framework/modules/usuario/usuario.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...getDbConfig(),
		}),
		UsuarioModule,
		AuthModule,
	],
})
export class AppModule {}
