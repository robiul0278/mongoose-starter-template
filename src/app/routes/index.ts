import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;