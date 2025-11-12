import express from 'express';
const router = express.Router()
import { createNoteValidator , updateNoteValidator } from '../validation/keepValidation.js'
import { 
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    getBinNotes,
    restoreNoteFromBin,
    deleteNotePermanentFromBin,
    emptyBin,
    archiveNote,
    getArchiveNotes,
    unArchiveNote }
 from "../controllers/keep.controllers.js"
import mediaUpload from "../controllers/mediaUpload.controller.js"
import validator from '../middlewares/validate.js';


// testing route
router.route("/test2").get(async (req , res) => {
  res.json({
    name: "Testing 2",
    sucees: true,
    status: 200,
    message: "Hey bro backend is working, you are listning from http://localhots:3000/api/v1/keep/test2"
  })
})


router.route("/create-note").post(createNoteValidator(), validator, createNote);
router.route("/get-notes").get(getNotes);
router.route("/update-note/:id").patch(updateNoteValidator() , validator, updateNote);
router.route("/delete-note/:id").post(deleteNote);
router.route("/get-bin-notes").get(getBinNotes);
router.route("/restore-note-from-bin/:id").post(restoreNoteFromBin);
router.route("/delete-note-permanent/:id").delete(deleteNotePermanentFromBin)
router.route("/empty-bin").post(emptyBin);
router.route("/archive-note/:id").post(archiveNote)
router.route("/get-archive-notes").get(getArchiveNotes);
router.route("/unarchive-note/:id").post(unArchiveNote)

router.route("/upload-media").post(mediaUpload);

export default router