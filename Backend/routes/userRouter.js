import express from "express";
import { register, login, logout, getMyProfile, getAllAuthor } from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.get("/logout",isAuthenticated, logout);
router.get("/myprofile", isAuthenticated , getMyProfile )
router.get("/authors", getAllAuthor);

export default router;