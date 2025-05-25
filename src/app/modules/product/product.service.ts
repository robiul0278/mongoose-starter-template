import { productModel } from "./product.model";

const createProductDB = async (payload: any) => {
    const result = await productModel.create(payload);
    return result;
}

const getAllProductDB = async () => {
    const result = await productModel.find({});
    return result;
}


export const productServices = {
    createProductDB,
    getAllProductDB,
}