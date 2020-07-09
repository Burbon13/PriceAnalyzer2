const express = require('express');
const logger = require('./src/utils/logger');

logger.info('Starting server');

logger.info('Initializing Express app');
const app = express();

const port = 12345;
logger.info(`Express server listening on port ${port}`);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

logger.info('Initializing Express routes');
app.get('/test', (req, res) => res.send('Server working! Hello world!'));



const productRepository = require('./src/data/ProductRepository');




logger.info('Server initialization finished successfully!');
