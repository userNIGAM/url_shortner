import ProjectMember from "../models/ProjectMember";
import Project from "../models/Project";
import User from "../models/User";

export const assignMemberToProject = async (req: any, res: any) => {
  try {
    // 1. Get the project ID from the URL
    // Example: POST /api/projects/PROJECT_ID/members
    // The project ID should come from req.params
    const { id } = req.params;

    // 2. Get the user ID from the request body
    // This is the user we want to assign to the project
    const { userId } = req.body;

    // 3. Find the project
    // IMPORTANT:
    // The project must belong to the logged-in user's organization
    // Never trust an organization ID sent by the client
    const project = await Project.findOne({
      _id: id,
      organization: req.user.organization,
    });
    // 4. If the project does not exist,
    // return a 404 response
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    // 5. Find the user
    // The user must also belong to the logged-in user's organization
    const user = await User.findOne({
        _id : userId,
        organization : req.user.organization
    })
    // 6. If the user does not exist,
    // return a 404 response

    // 7. Check whether this user is already assigned
    // We don't want the same user assigned to the same project twice

    // 8. If already assigned,
    // return an appropriate response

    // 9. Create the ProjectMember record
    // The organization must come from req.user.organization

    // 10. Return the newly created assignment
    // Do not return the user's password
  } catch (error) {
    // 11. Handle unexpected server/database errors
  }
};
