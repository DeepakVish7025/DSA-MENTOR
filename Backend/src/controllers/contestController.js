const Contest = require("../models/contest");
const Problem = require("../models/problem");
const User = require("../models/user");

// Create a new contest
const createContest = async (req, res) => {
  try {
    const { title, description, startTime, endTime, duration, problems, mcqs } = req.body;
    const creator = req.user._id;

    const newContest = await Contest.create({
      title,
      description,
      startTime,
      endTime,
      duration,
      problems: problems || [],
      mcqs: mcqs || [],
      creator,
    });

    res.status(201).json({ message: "Contest created successfully", contest: newContest });
  } catch (err) {
    res.status(500).json({ message: "Error creating contest", error: err.message });
  }
};

// Get all contests
const getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find()
      .populate("creator", "firstName lastName emailId")
      .populate("participants.user", "firstName lastName emailId")
      .sort({ startTime: -1 });
    res.status(200).json(contests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contests", error: err.message });
  }
};

// Get a contest by ID
const getContestById = async (req, res) => {
  try {
    const { id } = req.params;
    const contest = await Contest.findById(id)
      .populate("problems.problemId")
      .populate("creator", "firstName lastName")
      .populate("participants.user", "firstName lastName emailId");

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.status(200).json(contest);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contest", error: err.message });
  }
};

// Update a contest
const updateContest = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const contest = await Contest.findByIdAndUpdate(id, updates, { new: true });

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.status(200).json({ message: "Contest updated successfully", contest });
  } catch (err) {
    res.status(500).json({ message: "Error updating contest", error: err.message });
  }
};

// Delete a contest
const deleteContest = async (req, res) => {
  try {
    const { id } = req.params;
    const contest = await Contest.findByIdAndDelete(id);

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.status(200).json({ message: "Contest deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting contest", error: err.message });
  }
};

// User registration for a contest
const registerForContest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.result._id;

    const contest = await Contest.findById(id);
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    const isRegistered = contest.participants.some(
      (p) => p.user.toString() === userId.toString()
    );
    if (isRegistered) {
      return res.status(400).json({ message: "User already registered for this contest" });
    }

    contest.participants.push({ user: userId });
    await contest.save();

    res.status(200).json({ message: "Registered for contest successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering for contest", error: err.message });
  }
};

// MCQ Submission
const submitMcq = async (req, res) => {
  try {
    const { contestId, mcqIndex, selectedOption } = req.body;
    const userId = req.result._id;

    const contest = await Contest.findById(contestId);
    if (!contest) return res.status(404).json({ message: "Contest not found" });

    const now = new Date();
    if (now < contest.startTime || now > contest.endTime) {
      return res.status(400).json({ message: "Contest is not active" });
    }

    const participant = contest.participants.find(p => p.user.toString() === userId.toString());
    if (!participant) return res.status(403).json({ message: "Not registered for this contest" });

    // Check if already submitted
    const alreadySubmitted = participant.solvedMcqs.some(m => m.mcqIndex === mcqIndex);
    if (alreadySubmitted) return res.status(400).json({ message: "MCQ already submitted" });

    const mcq = contest.mcqs[mcqIndex];
    const isCorrect = mcq.correctOption === selectedOption;

    participant.solvedMcqs.push({
      mcqIndex,
      isCorrect,
      submittedAt: now
    });

    if (isCorrect) {
      participant.score += mcq.points;
      participant.submissionTime = now;
    }

    contest.markModified('participants');
    await contest.save();

    res.status(200).json({ 
      message: isCorrect ? "Correct answer! 🎉" : "Wrong answer. ❌",
      isCorrect,
      correctOption: isCorrect ? undefined : mcq.correctOption
    });
  } catch (err) {
    res.status(500).json({ message: "Error submitting MCQ", error: err.message });
  }
};

module.exports = {
  createContest,
  getAllContests,
  getContestById,
  updateContest,
  deleteContest,
  registerForContest,
  submitMcq,
};
