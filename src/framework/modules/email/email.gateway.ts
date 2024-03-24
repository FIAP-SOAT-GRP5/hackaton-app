import { RelatorioPontoDto } from '@/domain/dto/relatorio-ponto.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { DateTime } from 'luxon';
import { IEnviarRelRegistroPontoEmailGateway } from '../../../domain/application/interfaces/registro-ponto/enviar-rel-registro-ponto-email.gateway.interface';
import { Usuario } from '../../../domain/enterprise/entities/usuario.entity';

@Injectable()
export class EmailRepository implements IEnviarRelRegistroPontoEmailGateway {
	constructor(private mailerService: MailerService) {}

	async envioRelatorioPonto(
		usuario: Usuario,
		registros: RelatorioPontoDto[]
	) {
		const tableContent = registros
			.map((registro) => {
				const data = new Date(registro.data);
				const dataRegistro = DateTime.fromJSDate(data);
				return `
					<tr>
					  <td> ${dataRegistro.toFormat('dd/MM/yyyy')} </td>
					  <td> ${!registro.horaChegada ? '--' : registro.horaChegada} </td>
					  <td> ${!registro.horaSaidaAlmoco ? '--' : registro.horaSaidaAlmoco} </td>
					  <td> ${!registro.horaChegadaAlmoco ? '--' : registro.horaChegadaAlmoco} </td>
					  <td> ${!registro.horaSaida ? '--' : registro.horaSaida} </td>
					  <td> ${!registro.horasTrabalhadas ? '--' : registro.horasTrabalhadas} </td>
					</tr>
				  `;
			})
			.join('');

		await this.mailerService.sendMail({
			to: usuario.email,
			subject: 'Relatório de registro de ponto',
			html: `
			<div>
			  <h2 style='color: #292536; text-align: left'>Olá, ${usuario.nome}, seu registro de ponto</h2>
			  <p>Aqui estão os detalhes do seu registro de ponto:</p>
			  <table style='width:100%;'>
				<tr>
				  <th>Data</th>
				  <th>Hora de Chegada</th>
				  <th>Hora de Saída para o Almoço</th>
				  <th>Hora de Retorno do Almoço</th>
				  <th>Hora de Saída</th>
				  <th>Horas Trabalhadas</th>
				</tr>
				${tableContent}
			  </table>
			</div>
		  `,
		});
	}
}
