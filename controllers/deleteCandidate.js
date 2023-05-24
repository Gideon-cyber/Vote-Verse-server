import Runner from "../models/Candidate.js";

const DeleteCandidate = async (req, res) => {
  try {
    const { matric } = req.body;
    const deleteCandidate = await Runner.findOneAndDelete({ matric });
    console.log(deleteCandidate);
    res.status(204).send({
      deleted: deleteCandidate,
      massage: "Successfully deleted",
    });
  } catch (err) {
    res.status(403).send({
      message: "an error occured",
    });
  }
};

export default DeleteCandidate;
