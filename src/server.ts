import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from './routes';

// Create Express server
const server = express();

// Register Middlewares
server.use(cors());
server.set('port', process.env.PORT || 3000);

server.get('/', (req, res)=>{
    return res.send("API documentation: {server-url}/api/guide");
})

/* Swagger files start */
server.use('/api/guide', swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(swaggerUi.generateHTML(await import('./swagger.json')));
});
/* Swagger files end */

// Register Public Path
server.use('/api/public/static', express.static(path.join(__dirname, '../public/static')));

// Register router
RegisterRoutes(server);
// server.use(notFoundHandler);

export default server;