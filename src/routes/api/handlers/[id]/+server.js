import { json, error } from '@sveltejs/kit';
import AlertHandler from '$lib/server/models/AlertHandler';


export async function DELETE(event) {
    const session = await event.locals.auth();
    // If no session, return 403
    if (!session?.user?.email) {
        return error(403, { message: 'Access Denied' });
    }
    try {
        let id = event.params.id;
        const deletedalerthandler = await AlertHandler.findByIdAndDelete(id);
        return json(deletedalerthandler);
    } catch (err) {
        return error(500, err);
    }
}