import { body , param } from 'express-validator'

const createNoteValidator = () =>  {
    return [
        body("note_title")
            .isString()
            .notEmpty()
            .withMessage("Note title is required")
            
        ,
        body("note_discription")
            .isString()
            .notEmpty()
            .withMessage("Discription is required")
        ,
    ]
}

const updateNoteValidator = () => {
    return [

    ]
}

export default { createNoteValidator , updateNoteValidator }