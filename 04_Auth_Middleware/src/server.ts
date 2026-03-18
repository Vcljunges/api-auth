import express from "express"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get("/health", (req, res) => {
  res.json({ status: "OK" })
})

app.use("/users", userRouter)

app.use("/auth", authRouter)

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})
