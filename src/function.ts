import 'source-map-support/register';
import e, { Request, Response } from 'express';

import { bootstrapApplication } from "./app";

let expressApplication: e.Express = null;

export async function apiHandler(request: Request, response: Response) {
	if (!expressApplication) {
		console.log('Initializing new API instance!');
		const app = await bootstrapApplication();
		await app.init();
		expressApplication = app.getHttpAdapter().getInstance();
	}
	expressApplication(request, response);
}


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
