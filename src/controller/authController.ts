import { Request, Response } from "express";
import User, { UserModel } from "../model/User.ts"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const signUp = async (req: Request, res: Response) => {
  const user: UserModel = req.body
  if (!user.firstName || !user.lastName || !user.email || !user.password || !user.gender)
    return res.status(400).json({ message: "User is missing fields" })

  const duplicate = await User.findOne({ email: user.email }).exec()
  if (duplicate) return res.status(409) // Conflict

  try {
    // 10 is the default salt rounds
    const hashedPwd = await bcrypt.hash(user.password, 10)
    user.password = hashedPwd
    const result = await User.create(user)
    console.log(result)
    res.sendStatus(201)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" })

  const foundUser = await User.findOne({ email: email }).exec()
  
  if (!foundUser) return res.sendStatus(401) // Unauthorized

  const passwordsMatch = await bcrypt.compare(password, foundUser.password)
  if (!passwordsMatch) return res.sendStatus(401) // Unauthorized

  const accessToken = jwt.sign(
    {
      email: foundUser.email
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "5m" }
  )
  const refreshToken = jwt.sign(
    {
      email: foundUser.email
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "1d" }
  )

  // Persist refresh token with user
  foundUser.refreshToken = refreshToken
  const result = await foundUser.save()
  console.log(result)

  // Create Secure Cookie containing refresh token
  res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000 })

  // Send authorization token in the body
  res.json({ 
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    email: foundUser.email,
    gender: foundUser.gender,
    emailUpdates: foundUser.emailUpdates,
    accessToken,
    cart: foundUser.cart 
  })
}

const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies.jwt) return res.sendStatus(401) // Unauthorized

  const refreshToken = cookies.jwt
  const user = await User.findOne({ refreshToken }).exec()
  if (!user) return res.sendStatus(403) // Forbidden
  
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    (err: any, decoded: any) => {
      if (err || user.email !== decoded.email) return res.sendStatus(403) // Forbidden
      
      const accessToken = jwt.sign(
        {
          email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "5m" }
      )
      res.json({ 
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        emailUpdates: user.emailUpdates,
        accessToken,
        cart: user.cart
      })
    }
  )
}

const signOut = async (req: Request, res: Response) => {
  // On client side delete access token
  const cookies = req.cookies
  if (!cookies.jwt) return res.sendStatus(204) // No content

  const refreshToken = cookies.jwt
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })

  const user = await User.findOne({ refreshToken }).exec()
  if (!user) {
    return res.sendStatus(204) // No content
  }

  // Delete refreshToken in db
  user.refreshToken = ""
  const result = await user.save()
  console.log(result)
  res.sendStatus(204) // No content
}

export default { signUp, signIn, refreshToken, signOut }