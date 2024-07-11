import { handle as authenticationHandle } from '$lib/auth/auth.js';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
 
async function authorizationHandle({ event, resolve }) {
  // Protect any routes under /authenticated
    const session = await event.locals.auth();

    console.log(session);
    if (!session) {
      // Redirect to the signin page
      throw redirect(303, '/auth/signin');
    }
 
  // If the request is still here, just proceed as normally
  return resolve(event);
}

export const handle = sequence(authenticationHandle, authorizationHandle);