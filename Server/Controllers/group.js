// Server/Controllers/group.js
import Group from "../Models/group.js";

// Create Group
export const createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newGroup = new Group({
      name,
      description,
      createdBy: req.userId,
      members: [req.userId],
    });
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(500).json({ message: "Error creating group", error });
  }
};

// Add Member to Group
export const addMemberToGroup = async (req, res) => {
  try {
    const { userId } = req.body;
    const group = await Group.findById(req.params.id);
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
      res.status(200).json({ message: "User added to group" });
    } else {
      res.status(400).json({ message: "User already in group" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
};

// Search Groups by name
export const searchGroups = async (req, res) => {
  try {
    const { name } = req.query;
    const groups = await Group.find({ name: { $regex: name, $options: "i" } });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: "Error searching groups", error });
  }
};
