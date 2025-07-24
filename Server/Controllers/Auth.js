import users from "../Models/Auth.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await users.findOne({ email });

    if (!user) {
      user = await users.create({ email }); // create and assign to same `user` variable
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: user, token }); // always send this format
  } catch (error) {
    console.log("❌ Login error:", error);
    res.status(500).json({ message: error.message || "Something went wrong..." });
  }
};
