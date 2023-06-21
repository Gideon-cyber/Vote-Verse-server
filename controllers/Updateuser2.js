import BICS from "../models/BIC.js";
import Runner from "../models/Candidate.js";

export const UpdateThisUser2 = async (req, res) => {
  try {
    const BIC = BICS.BIC;
    const {
      matric,
      candidate1,
      candidate2,
      candidate4,
      candidate6,
      candidate7,
      candidate8,
      candidate9,
      candidate10,
      candidate11,
      candidate12,
    } = req.body;
    console.log(req.body);
    const userFound = await BIC.findOne({ matric });
    console.log(userFound);

    const filter = { matric: matric };
    const update = {
      $set: {
        president: candidate1 || "null",
        vicePresident: candidate2 || "null",
        // sport: candidate3 || "null",
        gensec: candidate4 || "null",
        // social: candidate5 || "null",
        pro: candidate6 || "null",
        finsec: candidate7 || "null",
        treasurer: candidate8 || "null",
        AGS: candidate9 || "null",
        specialDuties: candidate10 || "null",
        FLC1: candidate11 || "null",
        FLC2: candidate12 || "null",
      },
    };
    const options = { new: true };
    const updatedUser = await BIC.findOneAndUpdate(filter, update, options);
    console.log(updatedUser);

    //       //Update candidtate1
    const filter1 = { firstName: candidate1 };
    const update1 = {
      $inc: {
        vote: 1,
      },
    };
    const options1 = { new: true };

    const updateCandidate1 = await Runner.findOneAndUpdate(
      filter1,
      update1,
      options1
    );
    console.log(updateCandidate1);
    //Update candidtate2
    const filter2 = { firstName: candidate2 };
    const update2 = {
      $inc: {
        vote: 1,
      },
    };
    const options2 = { new: true };

    const updateCandidate2 = await Runner.findOneAndUpdate(
      filter2,
      update2,
      options2
    );
    // //Update candidtate3
    // const filter3 = { firstName: candidate3 };
    // const update3 = {
    //   $inc: {
    //     vote: 1,
    //   },
    // };
    // const options3 = { new: true };

    // const updateCandidate3 = await Runner.findOneAndUpdate(
    //   filter3,
    //   update3,
    //   options3
    // );
    //Update candidtate4
    const filter4 = { firstName: candidate4 };
    const update4 = {
      $inc: {
        vote: 1,
      },
    };
    const options4 = { new: true };

    const updateCandidate4 = await Runner.findOneAndUpdate(
      filter4,
      update4,
      options4
    );
    // //Update candidtate5
    // const filter5 = { firstName: candidate5 };
    // const update5 = {
    //   $inc: {
    //     vote: 1,
    //   },
    // };
    // const options5 = { new: true };

    // const updateCandidate5 = await Runner.findOneAndUpdate(
    //   filter5,
    //   update5,
    //   options5
    // );
    //Update candidtate6
    const filter6 = { firstName: candidate6 };
    const update6 = {
      $inc: {
        vote: 1,
      },
    };
    const options6 = { new: true };

    const updateCandidate6 = await Runner.findOneAndUpdate(
      filter6,
      update6,
      options6
    );
    //Update candidtate1
    const filter7 = { firstName: candidate7 };
    const update7 = {
      $inc: {
        vote: 1,
      },
    };
    const options7 = { new: true };

    const updateCandidate7 = await Runner.findOneAndUpdate(
      filter7,
      update7,
      options7
    );
    //Update candidtate8
    const filter8 = { firstName: candidate8 };
    const update8 = {
      $inc: {
        vote: 1,
      },
    };
    const options8 = { new: true };

    const updateCandidate8 = await Runner.findOneAndUpdate(
      filter8,
      update8,
      options8
    );
    //Update candidtate9
    const filter9 = { firstName: candidate9 };
    const update9 = {
      $inc: {
        vote: 1,
      },
    };
    const options9 = { new: true };

    const updateCandidate9 = await Runner.findOneAndUpdate(
      filter9,
      update9,
      options9
    );
    //Update candidtate10
    const filter10 = { firstName: candidate10 };
    const update10 = {
      $inc: {
        vote: 1,
      },
    };
    const options10 = { new: true };

    const updateCandidate10 = await Runner.findOneAndUpdate(
      filter10,
      update10,
      options10
    );
    //Update candidtate11
    const filter11 = { firstName: candidate11 };
    const update11 = {
      $inc: {
        vote: 1,
      },
    };
    const options11 = { new: true };

    const updateCandidate11 = await Runner.findOneAndUpdate(
      filter11,
      update11,
      options11
    );
    //Update candidtate12
    const filter12 = { firstName: candidate12 };
    const update12 = {
      $inc: {
        vote: 1,
      },
    };
    const options12 = { new: true };

    const updateCandidate12 = await Runner.findOneAndUpdate(
      filter12,
      update12,
      options12
    );
    console.log(updatedUser);
    if (updatedUser) {
      res
        .status(200)
        .send({ message: "You have successfully voted", voter: updatedUser });
      // res.status(200).send(updatedUser);
    } else {
      res.status(404).send({ message: "No Such User Found" });
    }
  } catch (err) {
    console.error(err);
  }
};
