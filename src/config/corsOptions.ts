import { CorsOptions } from "cors"
import { allowedOrigins } from "./allowedOrigins.ts"

export const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200
}