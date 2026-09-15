import Project from "../models/Project";

export const getProject = async (req: any, res: any) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      organization: req.user.organization,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const updateProject = async (req: any, res: any) => {
  try {
    const { name, description } = req.body;

    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        organization: req.user.organization,
      },
      { name, description },
      { new: true },
    );
    if(!project){
        return res.status(404).json({
            success : false,
            message : "project not found",
        })
    }
    return res.status(200).json({
        success : true,
        message : "Project update Successfully",
        project,
    })
    } catch (error) {
        console.error("Update Project Error : ", error)

        return res.status(500).json({
            success : false,
            message : "Something Went Wrong!"
        })
    }
};


export const deleteProject = async(req : any, res : any) =>{
    try {
        const project = await Project.findOneAndDelete({
            _id : req.params.id,
            organization : req.user.organization
        })

        if(!project){
            return res.status(404).json({
                success : false,
                message : "Project not Found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Project deleted successfully"
        })
    } catch (error) {
        console.log("Delete project error", error);

        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}