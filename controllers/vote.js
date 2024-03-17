import Vote from "../models/vote.js";

// Controller function to get the current vote status
const getVoteStatus = async (req, res) => {
  try {
    // Retrieve the single vote document from the database
    const vote = await Vote.findOne();

    // If no vote document is found, return default value of false
    const canVote = vote ? vote.can_vote : false;

    res.status(200).json({
      can_vote: canVote,
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

// Controller function to update the vote status
const updateVoteStatus = async (req, res) => {
  try {
    // Find the single vote document and update its can_vote field
    const updatedVote = await Vote.findOneAndUpdate(
      {},
      { can_vote: req.body.can_vote },
      { new: true }
    );
    if (!updatedVote) {
      return res.status(404).json({ message: "Vote document not found" });
    }
    res.status(200).json({
      can_vote: updatedVote.can_vote,
      has_error: false,
      message: "vote status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      has_error: true,
      message: "failed to update vote status",
    });
  }
};

export { getVoteStatus, updateVoteStatus };
