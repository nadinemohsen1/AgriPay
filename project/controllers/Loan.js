import LoanApplication from "../models/LoanApplication.js";

// Create loan
export const createLoan = async (req, res) => {
    try {
        const { amountRequested, reason } = req.body;

        const loan = await LoanApplication.create({
            farmerId: req.user._id,  // logged-in user (farmer)
            amountRequested,
            reason
        });

        res.status(201).json(loan);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all loans (bank/admin)
export const getAllLoans = async (req, res) => {
    try {
        const loans = await LoanApplication.find().populate("farmerId", "-password");
        res.json(loans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single loan
export const getLoanById = async (req, res) => {
    try {
        const loan = await LoanApplication.findById(req.params.id)
            .populate("farmerId", "-password");

        if (!loan) return res.status(404).json({ message: "Loan not found" });
        res.json(loan);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get loans for logged-in farmer
export const getMyLoans = async (req, res) => {
    try {
        const loans = await LoanApplication.find({ farmerId: req.user._id });
        res.json(loans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update loan (farmer can update ONLY pending)
export const updateLoan = async (req, res) => {
    try {
        const loan = await LoanApplication.findById(req.params.id);

        if (!loan) return res.status(404).json({ message: "Loan not found" });

        if (loan.farmerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        if (loan.status !== "pending") {
            return res.status(400).json({ message: "Cannot update reviewed loans" });
        }

        if (req.body.amountRequested !== undefined) loan.amountRequested = req.body.amountRequested;
        if (req.body.reason !== undefined) loan.reason = req.body.reason;

        await loan.save();

        res.json(loan);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete loan (farmer can delete ONLY pending)
export const deleteLoan = async (req, res) => {
    try {
        const loan = await LoanApplication.findById(req.params.id);

        if (!loan) return res.status(404).json({ message: "Loan not found" });

        if (loan.farmerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        if (loan.status !== "pending") {
            return res.status(400).json({ message: "Cannot delete reviewed loans" });
        }

        await loan.deleteOne();

        res.json({ message: "Loan deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Approve / Reject (bank officer)
export const reviewLoan = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const loan = await LoanApplication.findById(req.params.id);

        if (!loan) return res.status(404).json({ message: "Loan not found" });

        loan.status = status;
        await loan.save();

        res.json(loan);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
