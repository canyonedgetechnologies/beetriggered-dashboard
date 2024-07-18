import Key from '$lib/server/models/Key';
import bcrypt from 'bcrypt';
import dbConnect from '$lib/server/dbConnect.js';

dbConnect();

export const get_api_key_permissions = async (public_key, secret_key) => {
    try {
        const key = await Key.findOne({ public_key: public_key });

        if (!key) {
            return null;
        }

        const match = await bcrypt.compare(secret_key, key.secret_key);

        if (!match) {
            return null;
        }

        return key.permissions;
    } catch (err) {
        console.log('ERROR: ', err);
        return null;
    }
}