import Accredit from "../models/accredit.js";

// Controller function to get the current accreditation status
const getAccreditStatus = async (req, res) => {
  try {
    // Retrieve the single vote document from the database
    const accredit = await Accredit.findOne();

    // If no accredit document is found, return default value of false
    const is_accredit = accredit ? accredit.is_accredit : false;

    res.status(200).json({
      is_accredit,
      has_error: false,
      message: "vote status retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      has_error: true,
      message: "failed to retrieve vote status",
    });
  }
};

// Controller function to update the accreditation status
const updateAccreditStatus = async (req, res) => {
  try {
    // Find the single accredit document and update its can_vote field
    const updatedAccreditation = await Accredit.findOneAndUpdate(
      {},
      { is_accredit: req.body.is_accredit },
      { new: true }
    );
    if (!updatedVote) {
      return res
        .status(404)
        .json({ message: "accreditation document not found" });
    }
    res.status(200).json({
      is_accredit: updatedAccreditation.is_accredit,
      has_error: false,
      message: "accreditation status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      has_error: true,
      message: "failed to update accreditation status",
    });
  }
};

export { getAccreditStatus, updateAccreditStatus };
