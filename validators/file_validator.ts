import joi from 'joi';

export const file_to_find = joi.object({
    name:joi.string().required()
});
export const id_to_delete= joi.object({
    id:joi.string().required()
});