import { Request, Response } from "express";
import User from "../model/User.ts";

const putUser = async (req: Request, res: Response) => {
  const user = req.body
  console.log(user)
  const foundUser = await User.findOne({ email: user.email })
  if (!foundUser) return res.status(400).json({ message: "Email is invalid" })
  foundUser.cart = user.cart
  await foundUser.save()
  res.json({success: true})
}

export default { putUser }