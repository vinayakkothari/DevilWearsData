import User from '../models/User.js'; 
export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.query; // Use query instead of body for GET request

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Update user points
export const updateUserPoints = async (req, res) => {
  try {
    const { userId, points } = req.body;

    if (!userId || points == null) {
      return res.status(400).json({ message: "User ID and points are required" });
    }

    // Find the user by ID and update their points
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { points: points } },  // Update points
      { new: true, runValidators: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Points updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating points:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
