import { Request, Response } from "express"
import TShirt from "../model/TShirt.ts"

const getTShirts = async (req: Request, res: Response) => {
  const data = await TShirt.find()
  res.status(200).json(data)
}

const getTShirtByProductId = async (req: Request, res: Response) => {
  const { productId } = req.query

  const product = await TShirt.findOne({ productUrl: { $regex: `${productId}$` } })
  res.status(200).json(product)
}

const getTShirtsByIds = async (req: Request, res: Response) => {
  const ids = req.query.productWithOtherColor as string
  
  const data = await TShirt.find({ _id: { $in: ids } })
  res.status(200).json(data)
}

const other = async (req: Request, res: Response) => {
  console.log("here")
  res.json({ msg: "hello" })
}

export default { getTShirts, getTShirtByProductId, getTShirtsByIds, other }