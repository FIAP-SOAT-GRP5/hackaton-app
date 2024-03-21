import { DateTime } from "luxon";
import { CurrentUser } from "../../../../framework/model/current-user.model";
import { RegistroPonto } from "../../../enterprise/entities/registro-ponto.entity";
import { Usuario } from "../../../enterprise/entities/usuario.entity";
import { ICriarRegistroPontoUseCase } from "../../interfaces/registro-ponto/criar-registro-ponto.use-case.interface";
import { IRegistroPontoRepository } from "../../interfaces/registro-ponto/registro-ponto-repository.interface";

export class CriarRegistroPontoUseCase implements ICriarRegistroPontoUseCase {
	constructor(
		private readonly repository: IRegistroPontoRepository,
	) {}

	private async buscarRegistroPontoOuCriar(usuario: CurrentUser, data: Date): Promise<RegistroPonto> {
		const registroPonto = await this.repository.buscarPorData(usuario, data);
		if (registroPonto) return registroPonto;
		const novoRegistroPonto = new RegistroPonto();
		novoRegistroPonto.usuario = new Usuario();
		novoRegistroPonto.usuario.id = usuario.id;
		novoRegistroPonto.data = data;
		return novoRegistroPonto;
	}


	async registrar(usuario: CurrentUser): Promise<RegistroPonto> {
		const agora = DateTime.now();
		const registroPonto = await this.buscarRegistroPontoOuCriar(usuario, agora.toJSDate());
		if (agora.hour <= 11 && !registroPonto.horaChegada) {
			registroPonto.horaChegada = agora.toJSDate();
		} else if (agora.hour <= 12 && agora.minute <= 45 && !registroPonto.horaSaidaAlmoco) {
			registroPonto.horaSaidaAlmoco = agora.toJSDate();
		} else if (agora.hour <= 15 && !registroPonto.horaChegadaAlmoco) {
			registroPonto.horaChegadaAlmoco = agora.toJSDate();
		} else if (agora.hour <= 19 && !registroPonto.horaSaida) {
			registroPonto.horaSaida = agora.toJSDate();
		}
		return this.repository.salvar(registroPonto);
	}
}
