import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import { ApiErrorResponseHandler } from './_lib/error-handler/api-error-response-handler';
import SwaggerDocs from './utlits/swagger';

const app = express();

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
