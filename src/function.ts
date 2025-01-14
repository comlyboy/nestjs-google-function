import { NestExpressApplication } from '@nestjs/platform-express';

import { Request, Response } from 'express';
import { http } from '@google-cloud/functions-framework';

import { bootstrapApplication } from "./app";

let cachedApplication: NestExpressApplication = null;

http('sample-function', async (request: Request, response: Response) => {
	if (!cachedApplication) {
		cachedApplication = await bootstrapApplication();
		await cachedApplication.init();
	}
	const expressInstance = cachedApplication.getHttpAdapter().getInstance();
	expressInstance(request, response);
});