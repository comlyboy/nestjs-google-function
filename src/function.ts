import { NestExpressApplication } from '@nestjs/platform-express';

import { Request, Response } from 'express';
import { http } from '@google-cloud/functions-framework';

import { bootstrapApplication } from "./app";

const _FUNCTION_NAME = 'sample-function';

let application: NestExpressApplication = null;

// Initialize the NestJS application
async function getInitApplication() {
	if (!application) {
		application = await bootstrapApplication();
		await application.init();
	}
	return application.getHttpAdapter().getInstance();
}

http(_FUNCTION_NAME, async (request: Request, response: Response) => {
	const expressInstance = await getInitApplication();
	expressInstance(request, response);
});

// Handle other events (e.g., Pub/Sub, Storage) by wrapping them as HTTP requests
// cloudEvent(_FUNCTION_NAME, async (event: CloudEvent<any>) => {
// 	console.log();

// 	const expressInstance = await getInitApplication();
// 	const request = {
// 		method: 'POST',
// 		url: '/api/pub-sub',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: event,
// 	} as unknown as Request;

// 	const response = {
// 		status: (code: number) => {
// 			console.log(`Response status: ${code}`);
// 			return response;
// 		},
// 		send: (body: any) => {
// 			console.log(`Response body: ${body}`);
// 			return response;
// 		},
// 		json: (body: any) => {
// 			console.log(`Response JSON: ${body}`);
// 			return response;
// 		},
// 	} as Response;

// 	await expressInstance(request, response);
// });