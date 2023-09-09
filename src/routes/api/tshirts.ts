import express from "express"
import tshirtsController from "../../controller/tshirtsController.ts"

const router = express.Router()

router.get("/", tshirtsController.getTShirts)

router.get("/findByProductId", tshirtsController.getTShirtByProductId)

router.get("/findProductsByIds", tshirtsController.getTShirtsByIds)

export default router