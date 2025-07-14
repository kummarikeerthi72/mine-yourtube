import users from "../Models/Auth.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await users.findOne({ email });

    if (!existingUser) {
      try {
        const newUser = await users.create({ email });

        const token = jwt.sign(
          {
            email: newUser.email,
            id: newUser._id,
          },
          process.env.JWT_SECRET, // ✅ make sure spelling is correct here
          { expiresIn: "1h" }
        );

        res.status(200).json({ result: newUser, token });
      } catch (error) {
        console.log("❌ Error creating new user:", error);
        res.status(500).json({ message: error.message || "Something went wrong..." });
        return;
      }
    } else {
      // ✅ FIXED: use existingUser instead of newUser
      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser._id,
        },
        process.env.JWT_SECRET, // ✅ make sure this is correct
        { expiresIn: "1h" }
      );

      res.status(200).json({ result: existingUser, token });
    }
  } catch (error) {
    console.log("❌ Login error:", error);
    res.status(500).json({ message: error.message || "Something went wrong..." });
  }
};
