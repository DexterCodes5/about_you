import { Request, Response } from "express"
import Shirt from "../model/Shirt.ts"

const getAllShirts = async (req: Request, res: Response) => {
  const data = await Shirt.find()
  res.json(data)
}

const getShirtByProductId = async (req: any, res: any) => {
  console.log("here")
  const { productId } = req.query

  const product = await Shirt.findOne({ productUrl: { $regex: `${productId}$` } })
  res.status(200).json(product)
}

const getShirtsByIds = async (req: any, res: any) => {
  const productIds = req.query.productWithOtherColor as string
  
  const data = await Shirt.find({ _id: productIds})
  res.status(200).json(data)
}

export default { getAllShirts, getShirtByProductId, getShirtsByIds }