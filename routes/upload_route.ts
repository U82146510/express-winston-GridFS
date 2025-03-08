import { Router } from "express";
import {upload_file,get_file,delete_file} from '../controllers/upload_controoler.ts';
import {upload_memory} from '../middleware/multer.ts';


export const router:Router = Router();
router.post('/upload',upload_memory.array('file',5),upload_file);
router.post('/get',get_file);
router.post('/delete',delete_file);