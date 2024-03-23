/* v8 ignore start */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UsuarioLogado } from '../model/current-user.model';

export const ReqCurrentUser = createParamDecorator(
	(_: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>();
		const currentUser = request.user as UsuarioLogado;
		if (!currentUser) return undefined;
		return currentUser;
	}
);
/* v8 ignore stop */
