import {type Request,type Response,type NextFunction} from 'express';
import { logger } from '../logger/logger.ts';

export const error_handler = (err:unknown,req:Request,res:Response,next:NextFunction):void=>{
    if(err instanceof Error){
        logger.error(err.stack);
        res.status(500).json({message:err.message});
        return;
    }
    logger.error(err);
    res.status(500).json({message:'Internal server error'});
}