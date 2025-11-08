import { body , param } from 'express-validator'

const createNoteValidator = () =>  {
    return [
        body("note_title")
            .isString()
            .notEmpty()
            .withMessage("Note title is required")
            .isLength({ max: 20 }).withMessage("Title should be contains atmost 20 characters")

            
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
        body("note_title")
            .isString()
            .notEmpty()
            .trim()
            .withMessage("Note title is required")
            .isLength({ max: 20 }).withMessage("Title should be contains atmost 20 characters")

        ,
        body("note_discription")
            .isString()
            .notEmpty()
            .trim()
            .withMessage("Discription is required")
        ,
    ]
}

export default { createNoteValidator , updateNoteValidator }