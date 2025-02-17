import { useEffect, useState } from "react";
import {
  PROJECTS_LIST,
  EXIST_LOCAL_STORAGE,
  PROJECT_STATUS,
} from "../../../../services/constants";
import { getStorage, letterAvatar } from "../../../../services/helperFunctions";
import { NormalButton } from "../../../../components/common";
import { getleaderBoardCandidate } from "../../../../services/api/dashboard";
import "./myRanking.scss";
export const MyRanking = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [leadingBoard, setLeadingBoard] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    handleGetProjectListByProjectId();
  }, []);

  const handleGetProjectListByProjectId = () => {
    try {
      const storedUser =
        JSON.parse(getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER)) || {};
      setUserDetails(storedUser);
      console.log("storedUser?.batchIds----", storedUser);
      const batchId = storedUser?.batchIds[0].id;
      handleGetLeadingBoard(batchId);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      setUserDetails(null);
    }
  };

  const handleGetLeadingBoard = async (batchId) => {
    try {
      setloading(true);
      const response = await getleaderBoardCandidate(batchId);
      setloading(false);
      if (response) {
        setLeadingBoard(response);
      } else {
        console.error("Error fetching project list:", response.data);
      }
    } catch (e) {
      setloading(false);
    }
  };
  return (
    <div className="card ranking-card">
      <div className="card-body">
        <div>
          <h4 className="card-title text-dark mb-1">Leaderboard</h4>
          <small className="text-muted">Updated Today</small>
        </div>

        <div className="table-responsive mt-4">
          <table className="table gy-3 table-sm ">
            <thead>
              <tr>
                <th className="text-muted">Rank</th>
                <th className="text-muted">Team Member</th>
                <th className="text-muted"># of Kudos</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                leadingBoard?.map((leading, i) => (
                  <tr key={i}>
                    <td> {i + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <img
                            src={letterAvatar(leading?.name, 36)}
                            alt="..."
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h4 className="user-name mb-0">{leading?.name}</h4>
                          <small className="text-muted">
                            {leading?.candidateCode}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td> {leading?.overAllMark || 0}</td>
                  </tr>
                ))}
              {leadingBoard?.length === 0 && (
                <tr>
                  <td className="text-center" colSpan="3">
                    <h4>No Leaderboard</h4>
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td className="text-center" colSpan="3">
                    <h4>Loading...</h4>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
