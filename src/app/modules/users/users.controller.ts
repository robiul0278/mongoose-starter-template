import { RequestHandler } from "express";
import { userServices } from "./users.service";
import { roleValidationSchema, userValidationSchema } from "./users.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body;
        const zodData = userValidationSchema.parse(data);
        const result = await userServices.createUserDB(zodData);

        const { password, ...other } = result.toObject()

        // send response 
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User is created Successfully!",
            data: result,
        })
    } catch (err) {
        next(err);
    }
}

const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
        const result = await userServices.getAllUsersDB();
        // send response 
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User are retrieved Successfully!",
            data: result,
        })
    } catch (err) {
        next(err);
    }
}
const getSingleUser: RequestHandler = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSingleUserDB(userId);
        // send response 
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User are retrieved Successfully!",
            data: result,
        })
    } catch (err) {
        next(err);
    }
}

const changeRole: RequestHandler = async (req, res, next) => {

    try {
        const { userId } = req.params;
        const { role } = roleValidationSchema.parse(req.body);

        const result = await userServices.changeRoleDB(userId, role);
        // send response 
        sendResponse(res, {
            statusCode: httpStatus.OK,
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