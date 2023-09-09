import express from "express"
import authController from "../controller/authController.ts"

const router = express.Router()

router.post("/sign-up", authController.signUp)
  
router.post("/sign-in", authController.signIn)

router.get("/refresh", authController.refreshToken)

router.get("/sign-out", authController.signOut)

export default router