import multer from "multer";
const mem_storage = multer.memoryStorage();
export const upload_memory = multer({storage:mem_storage});
