import { json, error } from '@sveltejs/kit';
import Log from '$lib/server/models/Log';
import dbConnect from '$lib/server/dbConnect.js';

import { get_api_key_permissions } from '$lib/server/apiKeys.js';

dbConnect();

// GET list of logs
export async function GET(event) {
	const session = await event.locals.auth();

	const public_key = event.request.headers.get('x-bee-public');
	const secret_key = event.request.headers.get('x-bee-secret');
	// If no session, return 403
	if (!session?.user?.email) {
		if (!public_key || !secret_key) {
			return error(403, { message: 'Access Denied' });
		}
		const permissions = await get_api_key_permissions(
			public_key,
			secret_key
		);
		if (!permissions || permissions.logs.permission == 'none') {
			return error(403, { message: 'Access Denied' });
		}
	}
	try {
		const logs = await Log.find({}, null, { sort: { local_time: -1 } });
		return json(logs);
	} catch (err) {
		return error(500, err);
	}
}

// POST new log
export async function POST(event) {
	const session = await event.locals.auth();

	const public_key = event.request.headers.get('x-bee-public');
	const secret_key = event.request.headers.get('x-bee-secret');
	// If no session, return 403
	if (!session?.user?.email) {
		if (!public_key || !secret_key) {
			return error(403, { message: 'Access Denied' });
		}
		const permissions = await get_api_key_permissions(
			public_key,
			secret_key
		);
		if (!permissions || permissions.logs.permission != 'create') {
			return error(403, { message: 'Access Denied' });
		}
	}

	try {
		let data = await event.request.json();
		data = JSON.parse(data.message);
		if (data.logtype > 1999) {
			console.log('STARTUP LOG: ', data);
		}

		let newlog = Log.create(data);
		return json(newlog);

		return json({ message: 'ok' });
	} catch (err) {
		return error(500, err);
	}
}
