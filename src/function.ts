import { NestExpressApplication } from '@nestjs/platform-express';
import { http } from '@google-cloud/functions-framework';
import { Request, Response } from 'express';

import { bootstrapApplication } from "./app";

const _FUNCTION_NAME = 'sample-function';

let application: NestExpressApplication = null;

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

// cloudEvent(_FUNCTION_NAME, async (event: CloudEvent<any>) => {
// 	const app = await getInitApplication();
// 	const body = JSON.stringify(event);

// 	console.log('CloudEvent app:', app);
// 	return new Promise((resolve, reject) => {
// 		const chunks: any[] = [];
// 		const server = createServer(app);

// 		const req = new IncomingMessage(null);
// 		req.method = 'POST';
// 		req.url = '/api'; // your Nest endpoint
// 		req.headers = { 'content-type': 'application/json' };

// 		const res = new ServerResponse(req) as any;

// 		res.write = ((write) =>
// 			function (this: any, chunk: any) {
// 				chunks.push(chunk);
// 				return write.call(this, chunk);
// 			})(res.write);

// 		res.end = ((end) =>
// 			function (this: any, chunk?: any) {
// 				if (chunk) chunks.push(chunk);
// 				end.call(this, chunk);
// 				const bodyStr = Buffer.concat(chunks.map((c) => Buffer.from(c))).toString();
// 				resolve({
// 					statusCode: res.statusCode,
// 					headers: res.getHeaders(),
// 					body: bodyStr,
// 				});
// 			})(res.end);

// 		req.push(body);
// 		req.push(null);

// 		server.emit('request', req, res);
// 	});
// });
