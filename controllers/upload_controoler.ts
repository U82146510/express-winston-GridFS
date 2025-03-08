import { type Request,type Response,type NextFunction } from "express";
import { logger } from "../logger/logger.ts";
import {gfs} from '../config/atlas.ts';
import mongoose from "mongoose";
import {file_to_find,id_to_delete} from '../validators/file_validator.ts';
import {type name_body,type id_body} from '../interfaces/file_interface.ts';

export const upload_file = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        if(!req.files||!(req.files instanceof Array)){
            res.status(400).json({message:'no file uploaded'});
            return;
        }
        let file_name = [];
        for(const file of req.files){
            file_name.push(file.originalname);
            const upload = gfs.openUploadStream(file.originalname);
            upload.end(file.buffer);
            await new Promise((resolve,reject)=>{
                upload.on('finish',resolve);
                upload.on('error',(error)=>{
                    logger.error(error);
                    reject()
                });
            });
        }
        res.status(201).json({status:'ok',name:file_name})
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const get_file = async(req:Request<{},{},name_body>,res:Response,next:NextFunction)=>{
    const {value,error} = file_to_find.validate(req.body);
    if(error){
        res.status(400).json({message:error.message});
        return;
    }
    try {
        const find_file = await gfs.find({filename:value.name}).toArray();
        if(!find_file.length){
            res.status(404).json({message:'not found'});
            return;
        }
        gfs.openDownloadStreamByName(value.name).pipe(res);
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const delete_file = async(req:Request<{},{},id_body>,res:Response,next:NextFunction)=>{
    const {value,error} = id_to_delete.validate(req.body);
    if(error){
        res.status(400).json({message:error.message});
        return;
    }
    try {
        const delete_file = await gfs.delete(new mongoose.Types.ObjectId(value.id));
        res.status(200).json({message:'file is deleted'})
    } catch (error) {
        logger.error(error);
        next(error);
    }
};