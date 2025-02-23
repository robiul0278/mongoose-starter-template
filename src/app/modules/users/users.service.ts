import { IUser } from "./users.interface";
import { userModel } from "./users.model";

const createUserDB = async (user: IUser) => {
    const result = await userModel.create(user);
    return result;
}

const getAllUsersDB = async () => {
    const result = await userModel.find()
    return result;
}

const getSingleUserDB = async (userId: string) => {
    const result = await userModel.findOne({_id: userId})
    return result;
}

const changeRoleDB = async (userId: string, role: string) => {

    const result = await userModel.findByIdAndUpdate(
        {_id: userId},
        {$set: {role}},
        {new: true}
    )
    return result;
}

export const userServices = {
    createUserDB,
    getAllUsersDB,
    getSingleUserDB,
    changeRoleDB,
}