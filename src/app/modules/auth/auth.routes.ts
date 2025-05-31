import express from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { forgotPasswordValidationSchema, refreshTokenValidationSchema, userValidationSchema } from "./auth.validation";

const router = express.Router();

// call controller function 
router.post(
    '/register', 
    validateRequest(userValidationSchema), 
    authController.registerUser
);

router.post(
    '/login', 
    authController.loginUser
);

router.post(
    '/refresh-token', 
    validateRequest(refreshTokenValidationSchema),
    authController.refreshToken
);

router.post(
    '/forget-password', 
    validateRequest(forgotPasswordValidationSchema),
    authController.forgetPassword
);

export const authRoutes = router;