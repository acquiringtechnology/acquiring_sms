import { useEffect, useState } from "react";
import {
  PROJECTS_LIST,
  EXIST_LOCAL_STORAGE,
  PROJECT_STATUS,
} from "../../../../services/constants";
import { getStorage } from "../../../../services/helperFunctions";
import { NormalButton } from "../../../../components/common";
// import './myRanking.scss'
export const MyProjectStatus = () => {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    handleGetProjectListByProjectId();
  }, []);

  const handleGetProjectListByProjectId = () => {
    try {
      const storedUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
      if (!storedUser) {
        setProjectList([]);
        return;
      }

      const user = JSON.parse(storedUser);
      if (!user?.liveClassId) {
        setProjectList([]);
        return;
      }

      const projects = PROJECTS_LIST.find(
        ({ id }) => id === user.liveClassId
      )?.projectList;
      if (!projects) {
        setProjectList([]);
        return;
      }

      const value = projects?.map((project) => {
        const matchedProject = user.projects.find(
          ({ id }) => id === project.value
        );
        return {
          ...project,
          ...matchedProject,
        };
      });

      setProjectList(value || []);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      setProjectList([]);
    }
  };

  return (
    <div className="card ">
      <div className="card-body">
      <div>
      <h4 className="card-title text-dark mb-1">My Project Status</h4>
      <small className="text-muted">Updated Today</small>
      </div>

        <div className="table-responsive mt-4">
          <table className="table gy-3 table-sm project-table ">
            <thead>
              <tr>
                <th className="text-muted">ITEM</th>
                <th className="text-muted">STATUS</th>
                <th className="text-muted">MARk</th>
                <th className="text-muted">VERIFIES</th>
                <th className="text-muted">VIEW</th>
              </tr>
            </thead>

            <tbody>
              {projectList?.map((project,i) => (
                <tr key={i}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <img src={project?.img} alt="..." />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h4 className="project-name">{project?.label}</h4>
                        <small className="text-muted">CP10{i+1}</small>
                      </div>
                    </div>
                  </td>
                  {/* <td>
                  {project?.label}<br/>
                  <small className="text-muted">CP10{i+1}</small>
                  </td> */}
                  <td>
                    <label
                      className={`badge ${
                        project?.projectLink
                          ? "badge-gradient-primary"
                          : "badge-gradient-warning"
                      }`}
                    >
                      {project?.projectLink
                        ? "Complated"
                        : "yet to start"}
                    </label>
                  </td>
                  <td> {project?.mark || 0}</td>
                  <td>
                    <label
                      className={`badge ${
                        project?.status === PROJECT_STATUS.APPROVAL
                          ? "badge-gradient-success"
                          : "badge-gradient-danger"
                      }`}
                    >
                      {project?.status === PROJECT_STATUS.APPROVAL
                        ? "Yes"
                        : "No"}
                    </label>
                  </td>
                  <td>
                    <NormalButton
                      className="btn btn-inverse-primary btn-sm btn-icon me-2"
                      onClick={() => {}}
                      label={<i className="mdi mdi-eye-outline"></i>}
                    />
                     <NormalButton
                      className="btn btn-inverse-dark btn-sm btn-icon me-2"
                      onClick={() => {}}
                      label={<i className="mdi mdi-github"></i>}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
