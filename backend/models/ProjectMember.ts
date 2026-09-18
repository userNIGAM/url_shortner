import mongoose from "mongoose";
import User from "./User";
import Project from "./Project";

const projectMemberSchema = new mongoose.Schema(
  {
    // The project this assignment belongs to
    // We need to connect this to the Project model
    project: {
      // type should be an ObjectId
      // ref should point to "Project"
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    // The user who is assigned to the project
    // We need to connect this to the User model
    user: {
      // type should be an ObjectId
      // ref should point to "UserTable"
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserTable",
    },

    // The organization is stored here as an additional security check
    // It must come from the logged-in user's organization
    organization: {
      // type should be an ObjectId
      // ref should point to "Organization"
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  {
    // We want createdAt and updatedAt automatically
    timestamps: true,
  },
);

// Create the model from the schema
const ProjectMember = mongoose.model("ProjectMember", projectMemberSchema);

export default ProjectMember;
