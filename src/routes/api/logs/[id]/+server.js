import { json, error } from '@sveltejs/kit';
import Log from '$lib/server/models/Log';
import dbConnect from '$lib/server/dbConnect.js';

import { get_api_key_permissions } from '$lib/server/apiKeys.js';

dbConnect();

// Get Log by id

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
		const log = await Log.findById(event.params.id);
		return json(log);
	} catch (err) {
		return error(500, err);
	}
}

// PUT log by id

export async function PUT(event) {
	const body = await event.request.json();

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
		const log = await Log.findByIdAndUpdate(event.params.id, body);
		return json(log);
	} catch (err) {
		return error(500, err);
	}
}
