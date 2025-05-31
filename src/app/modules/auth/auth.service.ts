import AppError from "../../errors/AppError";
import { ILoginUser, IRegisterUser } from "./auth.interface";
import { userModel } from "./auth.model";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
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

    // create accessToken 
    const jwtPayload = {
        userId: isUserExists?._id,
        email: isUserExists?.email,
        role: isUserExists?.role,
    }

    const accessToken = jwt.sign(
        jwtPayload, config.jwt_secret_token,
        {expiresIn: '1d'}
    );

    // create refreshToken 
    const refreshToken = jwt.sign(
        jwtPayload, config.jwt_refresh_token,
        {expiresIn: '30d'}
    );

    return {
        accessToken,
        refreshToken,
    }
}


const refreshToken = async (token: string) => {

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    //! checking if the given token is valid
    const decoded = jwt.verify(token, config.jwt_refresh_token as string) as JwtPayload;
    const {userId } = decoded;

    //! checking if the user is exist
    const isUserExists = await userModel.findById({ _id: userId });

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
    }
    // create accessToken 
    const jwtPayload = {
        userId: isUserExists?._id,
        email: isUserExists?.email,
        role: isUserExists?.role,
    }

    const accessToken = jwt.sign(
        jwtPayload, config.jwt_secret_token,
        {expiresIn: '1d'}
    );

    return {
        accessToken,
    }
}




export const authServices = {
    RegisterDB,
    LoginDB,
    refreshToken,
}