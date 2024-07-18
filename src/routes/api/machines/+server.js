import { json, error } from '@sveltejs/kit';
import Machine from '$lib/server/models/Machine';
import dbConnect from '$lib/server/dbConnect.js';

import { get_api_key_permissions } from '$lib/server/apiKeys.js';

dbConnect();

// GET list of machines
export async function GET(event) {
    const session = await event.locals.auth();

    const public_key = event.request.headers.get('x-bee-public');
    const secret_key = event.request.headers.get('x-bee-secret');
    // If no session, return 403
    if (!session?.user?.email) {
        if (!public_key || !secret_key) {
            return error(403, { message: 'Access Denied' });
        }
        const permissions = await get_api_key_permissions(public_key, secret_key);
        if (!permissions || permissions.machines.permission == "none") {
            return error(403, { message: 'Access Denied' });
        }
    }
    try {
        const machines = await Machine.find({});
        return json(machines);
    } catch (err) {
        return error(500, err);
    }
}

// POST new machine
export async function POST(event) {
    const session = await event.locals.auth();

    const public_key = event.request.headers.get('x-bee-public');
    const secret_key = event.request.headers.get('x-bee-secret');
    // If no session, return 403
    if (!session?.user?.email) {
        if (!public_key || !secret_key) {
            return error(403, { message: 'Access Denied' });
        }
        const permissions = await get_api_key_permissions(public_key, secret_key);
        if (!permissions || permissions.machines.permission != "create") {
            return error(403, { message: 'Access Denied' });
        }
    }

    try {
        let body = await event.request.json();

        const newmachine = await Machine.create(body);

        return json(newmachine);
    } catch (err) {
        return error(500, err);
    }
}