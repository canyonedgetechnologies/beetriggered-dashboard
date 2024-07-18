import { json, error } from '@sveltejs/kit';
import Machine from '$lib/server/models/Machine';
import dbConnect from '$lib/server/dbConnect.js';

import { get_api_key_permissions } from '$lib/server/apiKeys.js';

dbConnect();

// GET machine by id

export async function GET(event) {
	const session = await event.locals.auth();

	const public_key = event.request.headers.get('x-bee-public');
	const secret_key = event.request.headers.get('x-bee-secret');
	// If no session, return 403
	if (!session?.user?.email) {
		if (!public_key || !secret_key) {
			return error(403, { message: 'Access Denied! No Keys!' });
		}
		const permissions = await get_api_key_permissions(
			public_key,
			secret_key
		);

		// if no permissionsn or if machine id is not in list of machine_ids [{ id: machine_id, permssion: "read"}]
		if (
			!permissions ||
			!permissions.machines.machine_ids ||
			permissions.machines.machine_ids.length == 0
		) {
			console.log(permissions);
			return error(403, {
				message: 'Access Denied! No Permissions for Keys!',
			});
		}

		let hasPermission = false;
		permissions.machines.machine_ids.forEach((machine) => {
			if (machine.id == event.params.id && machine.permission != 'none') {
				hasPermission = true;
			}
		});

		if (!hasPermission) {
			return error(403, {
				message: 'Access Denied! Incorrect Permissions!',
			});
		}
	}
	try {
		const machine = await Machine.findById(event.params.id);
		return json(machine);
	} catch (err) {
		return error(500, err);
	}
}

// PUT machine by id

export async function PUT(event) {
	const session = await event.locals.auth();

	const public_key = event.request.headers.get('x-bee-public');
	const secret_key = event.request.headers.get('x-bee-secret');
	// If no session, return 403
	if (!session?.user?.email) {
		if (!public_key || !secret_key) {
			return error(403, { message: 'No Public or Secret Key' });
		}
		const permissions = await get_api_key_permissions(
			public_key,
			secret_key
		);

		// if no permissionsn or if machine id is not in list of machine_ids [{ id: machine_id, permssion: "read"}]
		if (
			!permissions ||
			!permissions.machines.machine_ids ||
			permissions.machines.machine_ids.length == 0
		) {
			return error(403, { message: 'No Permissions for Key' });
		}

		let hasPermission = false;
		permissions.machines.machine_ids.forEach((machine) => {
			if (
				machine.id == event.params.id &&
				(machine.permission == 'update' ||
					machine.permission == 'create' ||
					machine.permission == 'edit')
			) {
				hasPermission = true;
			}
		});

		if (!hasPermission) {
			return error(403, {
				message: 'Access Denied! Incorrect Permissions',
			});
		}
	}

	try {
		let body = await event.request.json();

		const machine = await Machine.findByIdAndUpdate(event.params.id, body);

		return json(machine);
	} catch (err) {
		return error(500, err);
	}
}
