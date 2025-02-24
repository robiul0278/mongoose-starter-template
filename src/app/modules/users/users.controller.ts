import { NextFunction, Request, Response } from "express";
import { userServices } from "./users.service";
import { roleValidationSchema, userValidationSchema } from "./users.validation";


const createUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const data = req.body;
        const zodData = userValidationSchema.parse(data);
        const result = await userServices.createUserDB(zodData);

        const { password, ...other } = result.toObject()

        // send response 
        res.status(200).json({
            success: true,
            message: "User is created Successfully!",
            data: other,
        })
    } catch (err) {
        next(err);
    }
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userServices.getAllUsersDB();
        // send response 
        res.status(200).json({
            success: true,
            message: "User are retrieved Successfully!",
            data: result,
        })
    } catch (err) {
        next(err);
    }
}
const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSingleUserDB(userId);
        // send response 
        res.status(200).json({
            success: true,
            message: "User are retrieved Successfully!",
            data: result,
        })
    } catch (err) {
        next(err);
    }
}

const changeRole = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { userId } = req.params;
        const { role } = roleValidationSchema.parse(req.body);

        const result = await userServices.changeRoleDB(userId, role);
        // send response 
        res.status(200).json({
            success: true,
            message: "Role Change Successfully!",
            data: result,
        })
    } catch (err) {
        next(err);
    }

}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    changeRole,
}