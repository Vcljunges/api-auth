import { Router } from "express"
import { UserController } from "../controllers/user.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const userRouter = Router()
const userController = new UserController()

userRouter.post("/", userController.create)

// userRouter.put("/:id", userController.update)
userRouter.put("/:id", authMiddleware, userController.update)

// --- TODAS as rotas abaixo deste ponto estarão protegidas ---
userRouter.use(authMiddleware)

userRouter.get("/", userController.getAll)
userRouter.get("/:id", userController.getById)
userRouter.delete("/:id", userController.delete)

export default userRouter
