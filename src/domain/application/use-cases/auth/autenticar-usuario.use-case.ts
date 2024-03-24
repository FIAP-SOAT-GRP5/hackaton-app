import { UsuarioAutenticadoDTO } from '@/domain/dto/usuario-autenticado.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAutenticarUsuarioUseCase } from '../../interfaces/autenticacao/autenticar-usuario.use-case.interface';
import { IUsuarioRepository } from '../../interfaces/usuario/usuario-repository.interface';

export class AutenticarUsuarioUseCase implements IAutenticarUsuarioUseCase {
	constructor(
		private usuarioRepository: IUsuarioRepository,
		private jwtService: JwtService
		) {}
	async autenticarUsuario(
		matricula: string, 
		palavraPasse: string
	): Promise<UsuarioAutenticadoDTO> {
		const usuario = await this.usuarioRepository.buscarPorMatricula(matricula);
		if(usuario?.senha !== palavraPasse) {
			throw new UnauthorizedException();
		}
		const payload = {
			sub: usuario.id, username: usuario.nome
		};

		return {
			accessToken: await this.jwtService.signAsync(payload)
		};
	}
}
