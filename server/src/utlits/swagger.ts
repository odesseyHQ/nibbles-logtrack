import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Logger API Docs',
      version: '1.0.0',
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/router.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

const SwaggerDocs = (app: Express) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
export default SwaggerDocs;
