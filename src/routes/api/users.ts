import express from "express"
import usersController from "../../controller/usersController.ts"

const router = express.Router()

router.put("/", usersController.putUser)

export default router