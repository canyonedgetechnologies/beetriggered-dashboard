import { json, error } from '@sveltejs/kit';
import dbConnect from '$lib/server/dbConnect.js';
import Key from '$lib/server/models/Key';

import { API_KEYGEN_PASS } from '$env/static/private';

import crypto from 'crypto';
import bcrypt from 'bcrypt';

dbConnect();

export async function POST(event) {
	const API_KEYGEN_PASS_HEADER =
		event.request.headers.get('x-api-keygen-pass');

	if (!API_KEYGEN_PASS_HEADER) {
		error(403, { message: 'Access Denied' });
	}

	if (API_KEYGEN_PASS_HEADER != API_KEYGEN_PASS) {
		error(403, { message: 'Access Denied!' });
	}

	const { permissions } = await event.request.json();

	if (!permissions || permissions == null) {
		error(400, { message: 'Permissions needed!' });
	}

	const publicKey = 'bee_public_' + crypto.randomBytes(24).toString('hex');
	const secretKey = 'bee_secret_' + crypto.randomBytes(24).toString('hex');

	let salt = await bcrypt.genSalt(10);
	let hash = await bcrypt.hash(secretKey, salt);

	try {
		const newKeyPair = await Key.create({
			public_key: publicKey,
			secret_key: hash,
			permissions: permissions,
		});
	} catch (e) {
		console.log(e);
		error(500, e);
	}
	return json({ public_key: publicKey, secret_key: secretKey });
}
