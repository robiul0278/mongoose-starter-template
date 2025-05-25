import AppError from "../../errors/AppError";
import { ILoginUser, IRegisterUser } from "./auth.interface";
import { userModel } from "./auth.model";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config";

const RegisterDB = async (payload: IRegisterUser) => {
    const result = await userModel.create(payload);
    return result;
}

const LoginDB = async (payload: ILoginUser) => {
    const isUserExists = await userModel.findOne({ email: payload?.email });

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
    }
    // checking is the password correct  
    const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExists?.password);

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, "This password not matched!");
    }

    const jwtPayload = {
        userId: isUserExists?._id,
        email: isUserExists?.email,
        role: isUserExists?.role,
    }

    const accessToken = jwt.sign(
        jwtPayload, config.jwt_secret_token,
        {
            expiresIn: '7d'
        }
    );

    return {
        accessToken,
        jwtPayload
    }
}




export const userServices = {
    RegisterDB,
    LoginDB,
}