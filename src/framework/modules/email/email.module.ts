import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { env } from 'process';
import { EmailRepository } from './email.respository';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: 'smtp.gmail.com',
				secure: false,
				auth: {
					user: env.EMAIL_USER,
					pass: env.EMAIL_PASS,
				},
			},
			defaults: {
				from: `E-mail automático`,
			},
			template: {
				dir: __dirname + '/templates',
				adapter: new PugAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
	controllers: [],
	providers: [EmailRepository],
	exports: [EmailRepository],
})
export class EmailModule {}
