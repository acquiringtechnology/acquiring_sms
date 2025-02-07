import { useState, useRef, useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  getStorage,
  getDisplayName,
} from "../../../../services/helperFunctions";
import {
  NormalButton,
  NormalInput,
  NormalSelect,
  NormalCheckbox,
} from "../../../common";
import { candidateSchemaModule } from "../../../../services/module/candidate";
import Swal from "sweetalert2";
import { updateCandidateDetailById } from "../../../../redux/action/candidate.action";
import { useAppDispatch ,useAppSelector} from "../../../../hooks/reducHooks";
import {
  EXIST_LOCAL_STORAGE,
  LOGIN_TYPE,
  PROJECTS_LIST,
  PROJECT_STATUS,
} from "../../../../services/constants";
import _, { set } from "lodash";
import { useParams } from "react-router";

export const CandidateProjects = ({ userDetail = null }) => {
  const { candidateId } = useParams();
  const dispatch = useAppDispatch();
    const candidateSync = useAppSelector((state) => state.candidateSync);
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: "error-message" })
  );
  const [, forceUpdate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [candidateForm, setcandidateForm] = useState({
    ...candidateSchemaModule,
    ...userDetail,
  });
  const [loginDetail, setloginDetail] = useState(null);

  useEffect(() => {
    try {
      const storedUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setloginDetail(user);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(userDetail)) {
      console.log("userDetail---", userDetail);
      setcandidateForm({
        ...candidateSchemaModule,
        ...userDetail,
      });
    }
  }, [userDetail]);
  const handleInputChange = (event, i) => {
    const { name, type, checked, value } = event.target;

    setcandidateForm((prevState) => {
      // Create a new copy of the projects array
      const updatedProjects = [...prevState.projects];

      // Update the project at index i
      updatedProjects[i] = {
        ...updatedProjects[i], // Keep previous values of the project
        [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
      };

      // Return the new state with updated projects
      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
    simpleValidator.current.purgeFields();
  };

  const handleCandidateSubmit = async () => {
    try {
      simpleValidator.current.purgeFields();
      const formValid = simpleValidator.current.allValid();
      console.log("formValid-----", simpleValidator.current);
      if (formValid) {
        setIsLoading(true);
        const userDetail = await dispatch(
          updateCandidateDetailById(
            { ...candidateForm },
            candidateForm?.userId || candidateId
          )
        );

        setIsLoading(false);
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1); // Consider removing this if possible
      }
    } catch (e) {
      setIsLoading(false);
      // setIsLoadingFrom(false);
    }
  };

  const handleAddnewProject = () => {
    setcandidateForm((prevState) => ({
      ...prevState,
      projects: [
        ...prevState.projects,
        {
          projectLink: "",
          mark: "",
          gitLink: "",
          id: "",
          status: PROJECT_STATUS.NOT_APPROVAL,
        },
      ],
    }));
  };

  const handleDeleteProject = (i) => {
    const project = candidateForm.projects[i];

    if (project?.status === PROJECT_STATUS.NOT_APPROVAL) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setcandidateForm((prevState) => ({
            ...prevState,
            projects: prevState.projects.filter((_, index) => index !== i),
          }));
        }
      });
    } else {
      Swal.fire({
        title: "Warning!",
        text: "Project status should be 'Not Approval' to delete.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card profile-card">
          <div className="card-body pt-9 pb-0">
            <NormalButton
              isLoader={candidateSync?.isCreateUpdateLoader}
              className="btn btn-gradient-primary me-2  btn-sm float-end"
              onClick={handleCandidateSubmit}
              label={"Update"}
            />

            <h4 class="card-title mb-4">Projects</h4>

            {candidateForm?.projects?.map((project, i) => (
              <div className="row" key={i}>
                <div className="col-md-3">
                  <NormalSelect
                    value={project?.id}
                    name="id"
                    onChange={(e) => handleInputChange(e, i)}
                    label="Select Project"
                    option={
                      PROJECTS_LIST?.find(
                        (project) => project?.id === candidateForm?.liveClassId
                      )?.projectList
                    }
                    errorMessage={simpleValidator.current.message(
                      "Project",
                      project?.id,
                      "required"
                    )}
                  />
                </div>
                <div className="col-md-3">
                  <NormalInput
                    value={project?.gitLink}
                    name="gitLink"
                    onChange={(e) => handleInputChange(e, i)}
                    label="Enter Project GIT URL"
                    errorMessage={simpleValidator.current.message(
                      "Project GIT URL",
                      project?.gitLink,
                      "required|url"
                    )}
                  />
                </div>
                <div className="col-md-3">
                  <NormalInput
                    value={project?.projectLink}
                    name="projectLink"
                    onChange={(e) => handleInputChange(e, i)}
                    label="Enter Project URL"
                    errorMessage={simpleValidator.current.message(
                      "Project URL",
                      project?.projectLink,
                      "required|url"
                    )}
                  />
                </div>
                {loginDetail?.loginType === LOGIN_TYPE.EMPLOYEE && (
                  <div className="col-md-2">
                    <NormalInput
                      value={project?.mark}
                      name="mark"
                      onChange={(e) => handleInputChange(e, i)}
                      label="Enter Mark"
                      errorMessage={simpleValidator.current.message(
                        "Mark",
                        project?.mark,
                        "required|numeric|max:20,num"
                      )}
                    />
                  </div>
                )}
                {loginDetail?.loginType === LOGIN_TYPE.EMPLOYEE && (
                  <div className="col-md-1 d-flex align-items-center">
                    <NormalCheckbox
                      checked={project?.status === PROJECT_STATUS.APPROVAL}
                      name="status"
                      onChange={(e) => handleInputChange(e, i)}
                      label="verify"
                    />
                    {simpleValidator.current.message(
                      "Status",
                      project?.status,
                      "required"
                    )}
                  </div>
                )}
                {loginDetail?.loginType !== LOGIN_TYPE.EMPLOYEE && (
                  <div className="col-md-1 d-flex align-items-center">
                    <NormalButton
                      onClick={handleAddnewProject}
                      className="btn btn-outline-primary btn-rounded btn-icon me-2"
                      label={<i class="mdi mdi-plus"></i>}
                    />
                    <NormalButton
                      onClick={() => handleDeleteProject(i, project)}
                      className="btn btn-outline-danger btn-rounded btn-icon"
                      label={<i class="mdi mdi-delete-outline"></i>}
                      disabled={candidateForm?.projects?.length === 1}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
