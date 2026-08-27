import express from "express";
import {authenticateToken, authorizeRoles} from "../middleware/authMiddleware.js";
import { applyFine, clearFine, getFineSetting, getIssues, getStudentIssues, issueManualBooks, returnBook, updateFineSettings } from "../controllers/bookController.js";


const bookRouter = express.Router();
bookRouter.get("/fine-settings", authenticateToken, getFineSetting)
bookRouter.get("/issues/student", authenticateToken, authorizeRoles("user"), getStudentIssues);

//admin
bookRouter.get("/issues", authenticateToken, authorizeRoles("admin"), getIssues);
bookRouter.post("/issue-manual", authenticateToken, authorizeRoles("admin"), issueManualBooks);

bookRouter.put("/issues/:id/return", authenticateToken, authorizeRoles("admin"), returnBook);
bookRouter.put("/issue/:id/fine", authenticateToken, authorizeRoles("admin"), applyFine);

bookRouter.put("/issues/:id/clear-fine", authenticateToken, authorizeRoles("admin"), clearFine);
bookRouter.put("/fine-settings", authenticateToken, authorizeRoles("admin"), updateFineSettings);

export default bookRouter;