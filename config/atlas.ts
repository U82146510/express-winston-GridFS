import mongoose, { mongo } from "mongoose";
import { logger } from "../logger/logger.ts";
import {GridFSBucket} from 'mongodb'
import dotenv from 'dotenv';
dotenv.config();

const atlas = process.env.atlas;

export const connect_to_atlas = async()=>{
    try {
        if(!atlas){
            throw new Error('atlas connection missing');
        }
        await mongoose.connect(atlas);
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
};

const db:mongoose.Connection = mongoose.connection;
export let gfs:GridFSBucket

db.on('error',(error)=>{
    logger.error(error);
    process.exit(1);
});
db.on('connected',()=>{
    logger.info('atlas connected');
});
db.on('reconnected',()=>{
    logger.info('atlas rennected');
});
db.on('disconnected',()=>{
    logger.info('atlas dissconected');
});
db.on('open',()=>{
    if(!db.db){
        logger.error("mongodb instance is undefined")
        process.exit(1);
    }
    gfs = new mongoose.mongo.GridFSBucket(db.db,{bucketName:'uploads'})
});
process.on('SIGINT',async()=>{
    await db.close();
    process.exit(0);
    
});