import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";

export async function bootstrapApplication() {
	try {
		const application = await NestFactory.create<NestExpressApplication>(AppModule);
		application.setGlobalPrefix('api');
		application.enableCors();
		// application.use(helmet());
		// application.use(compression())
		// application.useGlobalFilters(new AllExceptionFilter(), new HttpExceptionFilter());
		application.useGlobalPipes(new ValidationPipe({
			whitelist: true, transform: true,
			transformOptions: { enableImplicitConversion: true }
		}));
		// application.use(
		// 	rateLimit({
		// 		windowMs: 15 * 60 * 1000, // 15 minutes
		// 		max: 100, // limit each IP to 100 requests per windowMs
		// 		handler: (req: Request, res: Response) => {
		// 			res.status(HttpStatus.TOO_MANY_REQUESTS)
		// 				.send({ message: 'Too many network requests!' });
		// 		},
		// 		keyGenerator: (req) => {
		// 			return utilityService.getIpAddress(req);
		// 		}
		// 	})
		// );

		// morgan.token('id', request => {
		// 	return utilityService.getCurrentInvocation().event?.requestContext?.requestId || Date.now().toString();
		// });
		// morgan.token('invocationId', request => {
		// 	return utilityService.getCurrentInvocation().context?.awsRequestId;
		// });
		// application.use(morgan('LOG => :id | :invocationId | :date[iso] | :method | :status | :url - :total-time ms'));

		return application;
	} catch (error) {
		console.log('Nest start failed', error);
	}

}