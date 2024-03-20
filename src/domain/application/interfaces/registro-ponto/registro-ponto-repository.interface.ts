/* v8 ignore start */

import { CurrentUser } from "../../../../framework/model/current-user.model";
import { RegistroPonto } from "../../../enterprise/entities/registro-ponto.entity";

export interface IRegistroPontoRepository {
	salvar(registroPonto: RegistroPonto): Promise<RegistroPonto>;
	buscarPorData(usuario: CurrentUser, data: Date): Promise<RegistroPonto | undefined>;
}
/* v8 ignore stop */