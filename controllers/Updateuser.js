import BICS from "../models/BIC.js";
import Runner from "../models/Candidate.js";

export const UpdateThisUser = async (req, res) => {
  try {
    const BIC = BICS.BIC;
    const {
      matric,
      candidate1,
      candidate2,
      candidate3,
      candidate4,
      candidate5,
      candidate6,
      candidate7,
      candidate8,
      candidate9,
      candidate10,
      candidate11,
      candidate12,
    } = req.body;
    console.log(req.body);
    const isVoted = await BIC.findOne({ matric });
    console.log(isVoted);
    if (isVoted.Voted === true) {
      res.status(403).send({
        message: "You have already voted",
        status: isVoted,
      });
    } else {
      const filter = { matric: matric };
      const update = {
        $set: {
          president: candidate1 || "null",
          vicePresident: candidate2 || "null",
          sport: candidate3 || "null",
          gensec: candidate4 || "null",
          social: candidate5 || "null",
          pro: candidate6 || "null",
          finsec: candidate7 || "null",
          treasurer: candidate8 || "null",
          AGS: candidate9 || "null",
          specialDuties: candidate10 || "null",
          FLC1: candidate11 || "null",
          FLC2: candidate12 || "null",
          Voted: true,
        },
      };
      const options = { new: true };
      const updatedUser = await BIC.findOneAndUpdate(filter, update, options);
      console.log(updatedUser);

      const candidatesToUpdate = [
        candidate1,
        candidate2,
        candidate3,
        candidate4,
        candidate5,
        candidate6,
        candidate7,
        candidate8,
        candidate9,
      ];

      const updateCandidates = candidatesToUpdate.map(async (candidate) => {
        if (candidate) {
          const filter = { firstName: candidate };
          const update = {
            $inc: {
              vote: 1,
            },
          };
          const options = { new: true };
          return await Runner.findOneAndUpdate(filter, update, options);
        }
      });

      await Promise.all(updateCandidates);

      if (updatedUser) {
        res.status(200).send({
          message: "You have successfully voted",
          voter: updatedUser,
        });
      } else {
        res.status(404).send({ message: "No Such User Found" });
      }
    }
  } catch (err) {
    console.error(err);
  }
};
