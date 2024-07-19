import { json, error } from '@sveltejs/kit';
import Log from '$lib/server/models/Log';
import AlertHandler from '$lib/server/models/AlertHandler';
import dbConnect from '$lib/server/dbConnect.js';

import LogEmail from '$lib/components/email/LogEmail.svelte';

import { render } from 'svelte-email';

import { Resend } from 'resend';

import { get_api_key_permissions } from '$lib/server/apiKeys.js';
import { AUTH_RESEND_KEY } from '$env/static/private';

import { logtypes } from '$lib';

dbConnect();

const resend = new Resend(AUTH_RESEND_KEY);

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
		let filter = {};

		let searchParams = event.url.searchParams;

		if (searchParams.has('logtype')) {
			filter.logtype = searchParams.get('logtype');
		}

		if (searchParams.has('status')) {
			filter.status = searchParams.get('status');
		}

		const logs = await Log.find(filter, null, {
			sort: { local_time_adjusted: -1 },
		});
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
			data.status = 'new';

			// Get All AlertHandlers where type = email and send an email to each one

			let emailHandlers = await AlertHandler.find({ type: 'email' });

			for (let emailHandler of emailHandlers) {
				let email = emailHandler.address;
				let subject =
					'New Alert: ' + logtypes[data.logtype] + ' - BeeTriggered!';
				let body = render({
					template: LogEmail,
					props: { log: data },
				});

				await resend.emails.send({
					from: 'william@canyonedgetech.com',
					to: email,
					subject: subject,
					html: body,
				});
			}

			let newlog = Log.create(data);
			return json(newlog);
		}

		return json({ message: 'ok' });
	} catch (err) {
		return error(500, err);
	}
}
