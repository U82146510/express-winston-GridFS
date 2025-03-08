import express,{type Application} from 'express';
import {logger} from './logger/logger.ts';
import {connect_to_atlas} from './config/atlas.ts';
import {router} from './routes/upload_route.ts';
import {error_handler} from './error/error_handler.ts';

const app:Application = express();
const port:number = 3000;
app.use(express.json());

app.use('/',router);
app.use(error_handler);
const start = async()=>{
    try {
        await connect_to_atlas();
        app.listen(port);
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
};

start();
