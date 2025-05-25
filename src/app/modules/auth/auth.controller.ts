import { RequestHandler } from "express";
import { userServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const registerUser: RequestHandler = catchAsync(async (req, res) => {
    const result = await userServices.RegisterDB(req.body);
    const { password, ...other } = result.toObject()

    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User register Successfully!",
        data: other,
    })
})
const loginUser: RequestHandler = catchAsync(async (req, res) => {
    const result = await userServices.LoginDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User login Successfully!",
        data: result,
    })
})


export const userController = {
    registerUser,
    loginUser,
}