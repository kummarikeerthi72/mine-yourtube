import express from "express";
import auth from "../middleware/auth.js";
import { addhistory, gethistoryvideos } from "../Controllers/History.js";

const router = express.Router();

router.post("/add", auth, addhistory);
router.get("/get", auth, gethistoryvideos);

export default router;
