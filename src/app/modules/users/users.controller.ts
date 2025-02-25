import { RequestHandler } from "express";
import { userServices } from "./users.service";
import { roleValidationSchema, userValidationSchema } from "./users.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createUser: RequestHandler = catchAsync(async (req, res) => {
    
   
    const result = await userServices.createUserDB(req.body);
    const { password, ...other } = result.toObject()

    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User is created Successfully!",
        data: other,
    })
})

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
    
    const result = await userServices.getAllUsersDB();
    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User are retrieved Successfully!",
        data: result,
    })

})

const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
   
    const { userId } = req.params;
    const result = await userServices.getSingleUserDB(userId);
    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User are retrieved Successfully!",
        data: result,
    })
})

const changeRole: RequestHandler = catchAsync(async (req, res) => {

    const { userId } = req.params;
    const { role } = req.body;

    const result = await userServices.changeRoleDB(userId, role);
    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Role Change Successfully!",
        data: result,
    })
})

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    changeRole,
}