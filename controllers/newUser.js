import BICS from "../models/BIC.js";
import { Admin } from "../models/admin.js";
import bicStudents, {
  BICSTUDENTS,
  Level1,
  Level2,
  Level3,
  Level4,
} from "../SampleData/sampledata.js";
const CreateVoter = async (req, res) => {
  try {
    // Level4.map(async ({ name, email, matric, admi }) => {
    const BIC = BICS.BIC;
    // const admin = 100100;
    const { name, email, matric, admin } = req.body;
    console.log(req.body);

    if (!name || !matric || !email) {
      res.status(401).send({ message: "Supply all credentials" });
    } else {
      const existingVoter = await BIC.find({ $or: [{ matric }, { email }] });

      if (existingVoter.length !== 0) {
        // console.log("Existing Voter", existingVoter, existingVoter2);
        res.status(403).send({
          message: "Voter has already been registered",
          has_error: true,
        });
        return;
      } else {
        const newVoter = await new BIC({
          name,
          email,
          matric,
        });
        const createdVoter = await newVoter.save();

        //now let us find which Admin created this user and then update him

        const query = { matric: admin };
        const upate = {
          $push: {
            registeredVoters: createdVoter,
          },
        };
        const option = {
          upsert: true,
        };
        const adminThatCreatedThisVoter = await Admin.findOneAndUpdate(
          query,
          upate,
          option
        );
        console.log(`admin ===>>>  ${adminThatCreatedThisVoter}`);
        if (adminThatCreatedThisVoter) {
          res.status(200).send({
            message: "Successfully created",
            createdVoter: createdVoter,
            creator: adminThatCreatedThisVoter,
            has_error: false,
          });
          console.log("Success");
        } else {
          res
            .status(401)
            .send({ message: "failed to create User", has_error: true });
        }
      }
    }
    // });
  } catch (err) {
    console.error(err);
  }
};

// const CreateVoter = async (req, res) => {
//   try {
//     console.log(BICSTUDENTS.length);
//     console.log("100level", Level1.length);
//     console.log("200level", Level2.length);
//     console.log("300level", Level3.length);
//     console.log("400level", Level4.length);

//     // Assuming Level4 is an array of objects containing voter information
//     for (const { name, email, matric } of Level1) {
//       const BIC = BICS.BIC;
//       const admin = 100100;

//       if (!name || !matric || !email) {
//         res.status(401).send({ message: "Supply all credentials" });
//         return; // Exit the function to prevent further execution
//       }

//       const existingVoter = await BIC.find({ $or: [{ matric }, { email }] });
//       if (existingVoter.length !== 0) {
//         continue; // Skip to the next iteration if the voter already exists
//       }

//       const newVoter = new BIC({ name, email, matric });
//       const createdVoter = await newVoter.save();

//       // Find the admin and update
//       const query = { matric: admin };
//       const update = { $push: { registeredVoters: createdVoter } };
//       const options = { upsert: true };
//       const adminThatCreatedThisVoter = await Admin.findOneAndUpdate(
//         query,
//         update,
//         options
//       );
//       console.log(`admin ===>>>  ${adminThatCreatedThisVoter}`);
//     }

//     // Send a single response after processing all voters
//     res.status(200).send({ message: "Successfully created all voters" });
//     console.log("All voters successfully created");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// };

export default CreateVoter;

// export const FindAdminRegisteredVoters = async (req, res) => {
//   const { admin } = req.body;
//   try {
//     const findAdmin = await Admin.findOne({ matric: admin });
//     console.log(findAdmin);
//     if (findAdmin) {
//       res.status(200).send(findAdmin.registeredVoters);
//     } else {
//       res.status(404).send({ message: "admin not found" });
//     }
//   } catch (err) {
//     res.status(404).send({
//       message: err.message,
//     });
//   }
// };

export const FindAdminRegisteredVoters = async (req, res) => {
  try {
    //find this user in question
    const { admin } = req.body;
    //const user = await User.find({ email });
    const findAdmin = await Admin.findOne({ matric: admin });
    // console.log(findAdmin);

    if (findAdmin) {
      const AdminregVoters = findAdmin.registeredVoters;
      // console.log(AdminregVoters);
      const votersArray = await Promise.all(
        AdminregVoters.map((_id) => BICS.BIC.find(_id))
      );

      const foundVoters = votersArray.map((el) => el[0]);

      // console.log(foundVoters);
      res.status(200).json({ voters: foundVoters, number: foundVoters.length });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
