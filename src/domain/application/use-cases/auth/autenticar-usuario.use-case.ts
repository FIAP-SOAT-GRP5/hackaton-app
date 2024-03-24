import { UsuarioAutenticadoDTO } from '@/domain/dto/usuario-autenticado.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
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
		if (!usuario) {
			throw new NotFoundException("Matrícula ou senha inválidos.")
		}
		const senhaValida = await compare(palavraPasse, usuario?.senha)
		if (!senhaValida) {
			throw new UnauthorizedException("Matrícula ou senha inválidos.");
		}
		const payload = {
			sub: usuario.id,
			matricula: usuario.matricula
		};

		return {
			accessToken: await this.jwtService.signAsync(payload)
		};
	}
}
