import express from "express";
import { VerifyUser } from "../controllers/verifyUser.js";
import { UpdateThisUser } from "../controllers/Updateuser.js";
import { UpdateThisUser2 } from "../controllers/Updateuser2.js";

import { FindThisUser } from "../controllers/findthisuser.js";
import { findAllUsers } from "../controllers/findAllUser.js";
import CreateVoter from "../controllers/newUser.js";
import CreateNewCandidate from "../controllers/newCandidate.js";
import { getOTP } from "../controllers/OTP.js";
import { VerifyOTP } from "../controllers/OTP.js";
import CreateAdmin from "../controllers/CreateAdminAccount.js";
import AdminLogin from "../controllers/loginAdminAccount.js";
import { VoterLogin } from "../controllers/loginAdminAccount.js";
import { findAllCandidates } from "../controllers/findAllCandidates.js";
import { FindAdminRegisteredVoters } from "../controllers/newUser.js";
import DeleteCandidate from "../controllers/deleteCandidate.js";
import PizzaSignUp from "../controllers/PizzaSignUp.js";
import PizzaSignIn from "../controllers/PizzaSignIn.js";
import { ForgetPasswordGetOtp } from "../controllers/forgotPasswords.js";
import { ForgetPasswordVerifyOTP } from "../controllers/forgotPasswords.js";
import ChangePassword from "../controllers/ChangePassword.js";
import { getVoteStatus, updateVoteStatus } from "../controllers/vote.js";
import {
  getAccreditStatus,
  updateAccreditStatus,
} from "../controllers/accredit.js";
const router = express.Router();

router.post("/verifyUser", VerifyUser); //this is an additional route to find a user by matric only
router.post("/updateThisUser", UpdateThisUser);
router.post("/updateThisUserOnly", UpdateThisUser2);
router.post("/findThisUser", FindThisUser);
router.post("/register", CreateVoter);
router.post("/candidate", CreateNewCandidate);
router.post("/getotp", getOTP);
router.post("/registerAdmin", CreateAdmin);
router.post("/adminLogin", AdminLogin);
router.post("/voterLogin", VoterLogin);
router.post("/verifyotp", VerifyOTP);
router.post("/findadminvoters", FindAdminRegisteredVoters);
router.post("/deleteCandidate", DeleteCandidate);
router.get("/findAllUsers", findAllUsers);
router.get("/findAllCandidates", findAllCandidates);

router.get("/vote/status", getVoteStatus);
router.post("/vote/status", updateVoteStatus);
router.get("/accredit/status", getAccreditStatus);
router.post("/accredit/status", updateAccreditStatus);

//For Pizza
router.post("/pizzaSignUp", PizzaSignUp); //signup for pizz APP
router.post("/pizzaSignIn", PizzaSignIn); //signin for pizza app
router.post("/forgetPasswordgetotp", ForgetPasswordGetOtp);
router.post("/verifypasswordotp", ForgetPasswordVerifyOTP);
router.post("/changePasswordotp", ChangePassword);
export default router;
