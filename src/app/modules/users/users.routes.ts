import express from "express";
import { userController } from "./users.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchema } from "./users.validation";

const router = express.Router();

// call controller function 
router.post('/create-user',validateRequest(userValidationSchema), userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUser);
router.patch('/role/:userId', userController.changeRole);

export const userRoutes = router;