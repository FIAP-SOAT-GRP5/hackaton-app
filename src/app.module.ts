import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getDbConfig } from './config/database';
import { AuthModule } from './framework/modules/auth/auth.module';
import { EmailModule } from './framework/modules/email/email.module';
import { RegistroPontoModule } from './framework/modules/registro-ponto/registro-ponto.module';
import { UsuarioModule } from './framework/modules/usuario/usuario.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...getDbConfig(),
		}),

		RegistroPontoModule,
		UsuarioModule,
		RegistroPontoModule,
		AuthModule,
		EmailModule,
	],
})
export class AppModule {}
