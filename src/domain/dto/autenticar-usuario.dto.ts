import { ApiProperty } from "@nestjs/swagger";

export class AutenticarUsuarioDTO {
	@ApiProperty({ example: "0000999" })
	matricula: string;

	@ApiProperty({ example: "Mudar.123" })
	senha: string;
}
