import { Request, Response } from "express";
import Address from "../model/Address.ts";

const postAddress = async (req: Request, res: Response) => {
  const address = req.body
  if (!address) res.sendStatus(400)

  // if address exists in db update
  if (address._id) {
    const foundAddress = Address.findById(address._id)
    await foundAddress.deleteOne()
    res.sendStatus(200)
  }
  try {
    await Address.create(address)
  } catch (err: any) {
    console.error(err)
  }
}

const getAddress = async (req: Request, res: Response) => {
  const { userId } = req.params
  if (!userId) res.sendStatus(400)

  const address = await Address.findOne({ userId }).exec()
  if (!address) res.status(400).json({ message: "Invalid userId" })

  res.json(address)
}

export default { postAddress, getAddress }