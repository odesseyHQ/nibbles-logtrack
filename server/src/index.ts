import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import { ApiErrorResponseHandler } from './_lib/error-handler/api-error-response-handler';
import SwaggerDocs from './utlits/swagger';
import cors from 'cors';

const app = express();

const whitelist = ['http://localhost:4700', 'http://logger.odesseylabs.com'];

const corsOptions: any = {
  origin: function (origin: string, callback: any) {
    console.log(origin);

    if (!origin || whitelist.indexOf(origin) !== -1) {
      console.log('Origin validated');
      callback(null, true);
    } else {
      console.log('Origin Invalid');
      callback(new Error(`${origin} Not allowed by CORS`));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
const port = 4700;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api', router);
app.use(ApiErrorResponseHandler);
SwaggerDocs(app);
