import { RequestHandler } from "express";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { productServices } from "./product.service";

const createProduct: RequestHandler = catchAsync(async (req, res) => {
    const result = await productServices.createProductDB(req.body);

    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product create successfully!",
        data: result,
    })
})
const getAllProduct: RequestHandler = catchAsync(async (req, res) => {
    console.log("Verify", req.user);
    const result = await productServices.getAllProductDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product get successfully!",
        data: result,
    })
})

export const productController = {
    createProduct,
    getAllProduct,
}