import { Request, Response } from "express";
import { userServices } from "./users.service";
import { roleValidationSchema, userValidationSchema } from "./users.validation";


const createUser = async (req: Request, res: Response) => {

    try {
        const data = req.body;
        const validationData = userValidationSchema.parse(data);
        const result = await userServices.createUserDB(validationData);

        // send response 
        res.status(200).json({
            success: true,
            message: "User is created Successfully!",
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        })
    }

}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsersDB();
        // send response 
        res.status(200).json({
            success: true,
            message: "User are retrieved Successfully!",
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        })
    }
}
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSingleUserDB(userId);
        // send response 
        res.status(200).json({
            success: true,
            message: "User are retrieved Successfully!",
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        })
    }
}

const changeRole = async (req: Request, res: Response) => {

    try {
        const { userId } = req.params;
        const {role} = roleValidationSchema.parse(req.body);

        console.log(userId, role);

        const result = await userServices.changeRoleDB(userId, role);
        // send response 
        res.status(200).json({
            success: true,
            message: "Role Change Successfully!",
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        })
    }

}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    changeRole,
}