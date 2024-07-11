import { SvelteKitAuth } from "@auth/sveltekit";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "$lib/db.js";
import Resend from "@auth/sveltekit/providers/resend";
import Google from "@auth/sveltekit/providers/google";
 
export const { handle, signIn } = SvelteKitAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        Resend({
            from: "william.phelps@canyonedgetech.com"
        }),
        Google
    ]
});