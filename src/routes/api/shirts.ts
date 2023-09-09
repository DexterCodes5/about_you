import express from "express"
import shirtsController from "../../controller/shirtsController.ts"

const router = express.Router()

router.route("/").get(shirtsController.getAllShirts)

router.route("/findByProductId").get(shirtsController.getShirtByProductId)

router.route("/findProductsByIds").get(shirtsController.getShirtsByIds)

export default router