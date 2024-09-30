import { Router } from "express";
import { getAllCategories } from "../../controllers/common/getAllCategories.controller.js";

export const commonRouter = Router();

commonRouter.route('/get-categories').get(getAllCategories)