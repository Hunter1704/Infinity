const Problem = require("../models/problems");

const getProblemTotals = async () => {
    const allProblemsCounts = await Problem.aggregate([
        {
            $group: {
                _id: "$difficulty",
                count: { $sum: 1 }
            }
        }
    ]);

    const problemTotals = {
        Basic: 0,
        Easy: 0,
        Medium: 0,
        Hard: 0,
        Total: 0
    };

    allProblemsCounts.forEach(item => {
        if (problemTotals.hasOwnProperty(item._id)) {
            problemTotals[item._id] = item.count;
            problemTotals.Total += item.count;
        }
    });

    return problemTotals;
};

module.exports = { getProblemTotals };
