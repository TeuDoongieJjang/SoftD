import express from "express";
import {
  home,
  login,
  ioOp,
  logout,
  userEdit,
  userView,
  io,
  signup,
  view,
} from "../controllers/directController.js";
import cors from "cors";

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: "https://softd.onrender.com/api",
  })
);

router.get("/api/:id", home);
router.post("/api/login", login);
router.get("/api/logout", logout);
router.get("/api/io/:id", io);
router.put("/api/io/:id/:action", ioOp);
router.post("/api/signup", signup);
router.get("/api/view/:id", view);
router.put("/api/user/edit/:id", userEdit);
router.get("/api/user/edit/:id", userView);

export default router;
