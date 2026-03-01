const User = require("../../models/users");
const mongoose = require("mongoose");
const { getProblemTotals } = require("../../utils/problemStats");

const getUserBasicProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId)
            return res.status(400).send("User Id is missing");

        if (!mongoose.Types.ObjectId.isValid(userId))
            return res.status(400).send("Invalid Problem ID provided.");

        const user = await User.findById(userId)
            .select("_id username fullName profileImageUrl noSolvedProblems checkedProblems points")
            .populate([
                {
                    path: "checkedProblems.pid",
                    select: "_id problemNo title tags difficulty",
                },
            ]);

        if (!user)
            return res.status(400).send("User does not exist");

        const problemTotals = await getProblemTotals();
        const plainUser = user.toObject();
        plainUser.problemTotals = problemTotals;

        res.status(200).json(plainUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getUserBasicProfile;

