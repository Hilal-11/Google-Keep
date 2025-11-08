import express from ('express');
const keepNote_routes = express.Router()

import getNotes from ('../controllers/getNotes')
import keepNote from ('../controllers/keepNote')
import deleteNote from ('../controllers/deleteNote')
import updateNote from ('../controllers/updateNote')

keepNote_routes.get("/getNotes" , getNotes)
keepNote_routes.post("/keepNote" , keepNote)
keepNote_routes.post("/deleteNote:id", deleteNote)
keepNote_routes.post("/updateNote:id", updateNote)


module.exports = keepNote_routes