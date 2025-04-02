const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); // Assuming Event schema is defined
const User = require("../models/User"); // Assuming User schema is defined
const { ensureAuthenticated } = require("../middleware/auth"); // Authentication middleware


// Profile Page Route
router.get("/profile", ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch user details
        const user = await User.findById(userId).select("name email");

        // Fetch events organized by the user
        const organizedEvents = await Event.find({ createdBy: userId });

        // Fetch events where the user has volunteered
        const volunteeredEvents = await Event.find({ volunteers: userId });

        res.render("profile", {
            user,
            organizedEvents,
            volunteeredEvents,
        });
    } catch (error) {
        console.error("Error fetching profile details:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
