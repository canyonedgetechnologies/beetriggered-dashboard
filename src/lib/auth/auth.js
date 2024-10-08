import { SvelteKitAuth } from '@auth/sveltekit';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '$lib/server/db.js';
import Resend from '@auth/sveltekit/providers/resend';
import Google from '@auth/sveltekit/providers/google';

import {
	AUTH_GOOGLE_ID,
	AUTH_GOOGLE_SECRET,
	AUTH_RESEND_KEY,
	AUTH_SECRET,
} from '$env/static/private';

export const { handle, signIn } = SvelteKitAuth({
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		Resend({
			apiKey: AUTH_RESEND_KEY,
			from: 'william.phelps@canyonedgetech.com',
		}),
		Google({
			clientId: AUTH_GOOGLE_ID,
			clientSecret: AUTH_GOOGLE_SECRET,
		}),
	],
	secret: AUTH_SECRET,
});
