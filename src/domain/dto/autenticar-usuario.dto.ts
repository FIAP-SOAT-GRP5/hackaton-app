import { ApiProperty } from "@nestjs/swagger";

export class AutenticarUsuarioDTO {
	@ApiProperty({ example: "0009991" })
	matricula: string;

	@ApiProperty({ example: "Mudar.123" })
	senha: string;
}
