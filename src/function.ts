import { http } from '@google-cloud/functions-framework'

import { bootstrapApplication } from "./app";

async function bootstrapFunction() {
	console.log('LOG => Initializing new Lambda API instance');
	const application = await bootstrapApplication();
	await application.init();
	const expressInstance = application.getHttpAdapter().getInstance();
	http('sample-function', expressInstance); // <- entry point definition
}
bootstrapFunction();
