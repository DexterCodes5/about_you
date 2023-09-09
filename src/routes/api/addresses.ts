import express from "express"
import addressController from "../../controller/addressController.ts"

const router = express.Router()

router.route("/").post(addressController.postAddress)
  
router.get("/:userId", addressController.getAddress)

export default router