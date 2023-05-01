import { Router } from "express";

import {
	create,
	deleteProject,
	getAllUserProjects,
} from "../controllers/ProjectController";
import AuthenticateUser from "../middlewares/Authenticate";
import ValidateToken from "../middlewares/ValidateToken";

const projectRouter = Router();

projectRouter.post("/create", ValidateToken, create);
projectRouter.delete("/:id", ValidateToken, deleteProject);
projectRouter.get("/user/:id", ValidateToken, getAllUserProjects);

export default projectRouter;
