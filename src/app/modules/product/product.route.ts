import express from "express";
import validateRequest from "../../middleware/validateRequest";
import authGard from "../../middleware/authGard";
import { productValidationSchema } from "./product.validation";
import { productController } from "./product.controller";
import { USER_ROLE } from "../auth/auth.constant";

const router = express.Router();

// call controller function 
router.post('/create',
    validateRequest(productValidationSchema),
    productController.createProduct
);

router.get('/', 
    authGard(USER_ROLE.user),
    productController.getAllProduct
);

export const productRoutes = router;