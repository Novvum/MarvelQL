import * as jwt from 'jsonwebtoken';
import { Context } from './getContext';

export function getUserId(ctx: Context) {
	const Authorization = ctx.request.get('Authorization');
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '');
		const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
			userId: string;
		};
		return userId;
	}
	return 1;
	// throw new AuthError();
}

export class AuthError extends Error {
	constructor() {
		super('Not authorized');
	}
}
