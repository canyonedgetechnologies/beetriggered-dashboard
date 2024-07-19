import { SvelteKitAuth } from '@auth/sveltekit';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '$lib/server/db.js';
import Resend from '@auth/sveltekit/providers/resend';
import Google from '@auth/sveltekit/providers/google';

import { AUTH_SECRET } from '$env/static/private';

export const { handle, signIn } = SvelteKitAuth({
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		Resend({
			from: 'william.phelps@canyonedgetech.com',
		}),
		Google,
	],
	secret: AUTH_SECRET,
});
