import express from "express";
import { userController } from "./users.controller";

const router = express.Router();

// call controller function 
router.post('/create-user', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUser);
router.patch('/role/:userId', userController.changeRole);

export const userRoutes = router;