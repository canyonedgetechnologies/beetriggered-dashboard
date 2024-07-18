import { json, error } from '@sveltejs/kit';
import AlertHandler from '$lib/server/models/AlertHandler';
import dbConnect from '$lib/server/dbConnect.js';

dbConnect();

export async function GET(event) {

    const session = await event.locals.auth();

    // If no session, return 403
    if (!session?.user?.email) {
        return error(403, { message: 'Access Denied' });
    }

    try {
        const alertHandlers = await AlertHandler.find({});
        return json(alertHandlers);
    } catch (err) {
        return error(500, err);
    }
}

export async function POST(event) {

    const session = await event.locals.auth();

    // If no session, return 403
    if (!session?.user?.email) {
        return error(403, { message: 'Access Denied' });
    }
    
    try {
        let body = await event.request.json();

        const newalerthandler = await AlertHandler.create(body);

        return json(newalerthandler);
    } catch (err) {
        return error(500, err);
    }
}