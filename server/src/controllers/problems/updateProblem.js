const validateDetails = require("../../utils/validateDetails");
const judge0 = require("../../judge0/judge0");
const Problem = require("../../models/problems");
const mongoose = require("mongoose");

const createFullReferenceSolution = (referenceSolution, starterCode) => {
    const starterCodeMap = {};
    starterCode.forEach((sc) => {
        starterCodeMap[sc.language] = sc;
    });

    const fullReferenceSolution = [];
    referenceSolution.forEach((rs) => {
        const sc = starterCodeMap[rs.language];
        if (sc) {
            const fullSoln = {
                language: rs.language,
                solutionCode: (sc.headerCode || "") + "\n" + (rs.solutionCode) + "\n" + (sc.mainCode || "")
            }
            fullReferenceSolution.push(fullSoln);
        }
    });

    return fullReferenceSolution;
}

const updateProblem = async (req, res) => {

    try {

        const { id } = req.params;

        // checking if the given id is valid database object id or not.
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send({ error: "Invalid Problem ID provided." });

        // checking if problem with the given id exists in the 'problems' collection or not
        const problem = await Problem.findById(id);
        if (!problem)
            return res.status(404).send({ error: "Problem not found with the given ID." });

        // adding problem creator _id in req.body object
        req.body.problemCreator = req.user._id;

        // validating problem details, if all the required fields are given or not
        validateDetails.problem(req.body);

        // extracting fields from req.body
        const { referenceSolution, starterCode, visibleTestCases, hiddenTestCases } = req.body;

        // create full solution
        const fullReferenceSolution = createFullReferenceSolution(referenceSolution, starterCode);

        // checking given refernce solution, if reference solution is itself satisfying the given test cases or not
        await judge0.validateProblem(fullReferenceSolution, visibleTestCases);

        await judge0.validateProblem(fullReferenceSolution, hiddenTestCases);

        // updating document in the collection 'problems'
        const updatedProblem = await Problem.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });

        res.status(201).send(updatedProblem);

    } catch (error) {
        console.log(error);
        const status = error.statusCode || 500;
        res.status(status).send({ error: error.message });
    }
}

module.exports = updateProblem;