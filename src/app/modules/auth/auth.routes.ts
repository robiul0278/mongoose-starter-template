import express from "express";
import { userController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchema } from "./auth.validation";

const router = express.Router();

// call controller function 
router.post('/register',validateRequest(userValidationSchema), userController.registerUser);
router.post('/login', userController.loginUser);

export const authRoutes = router;