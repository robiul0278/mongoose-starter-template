import { RequestHandler } from "express";
import { authServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";

const registerUser: RequestHandler = catchAsync(async (req, res) => {
    const result = await authServices.RegisterDB(req.body);
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
    const result = await authServices.LoginDB(req.body);
    const {refreshToken, ...token} = result;

    res.cookie("refreshToken", refreshToken,{
        secure: config.node_env === "production",
        httpOnly: true,
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User login Successfully!",
        data: token,
    })
})

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
    const {refreshToken} = req.cookies;
    const result = await authServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Create new accessToken!",
        data: result,
    })
})


export const authController = {
    registerUser,
    loginUser,
    refreshToken,
}