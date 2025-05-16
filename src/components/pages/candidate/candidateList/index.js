/* eslint-disable jsx-a11y/img-redundant-alt */
import faces from "../../../../assets/images/faces-clipart/pic-1.png";
import { BatchOneUp } from "../../../../components/common";
import { COURSE_ENQUIRY_STATUS_LIST , CLASS_MODE_LIST } from "../../../../services/constants";
import {
  handleGetProjectCompletedCount,
  getPendingPayment,
  gePaymentStatus,
  getIdByLabel,
  formatTimestamp
} from "../../../../services/helperFunctions";
import * as moment from "moment";
import Swal from "sweetalert2";
import { deleteLeadData } from "../../../../redux/action/lead.action";
import { useAppDispatch } from "../../../../hooks/reducHooks";
// import { updateCandidate } from "../../../../services/api/candidate";
import "./candidate.scss";
import { useNavigate } from "react-router";

export const CandidateList = ({
  candidateListData = [],
  isCandidateListLoader = false,
  batchListData = [],
  onEdit = () => {},
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleGetStatusTextColour = (status) => {
    const res = COURSE_ENQUIRY_STATUS_LIST.find(
      ({ value }) => value === status
    );
    return res;
  };

  const handleLatestUpdate = (candidate) => {
    try {
      if (!candidate) throw new Error("candidate data is missing.");

      // Helper function to extract and format timestamp
      const formatTimestamp = (date) => {
        if (date?.seconds && date?.nanoseconds) {
          const timestampInMilliseconds =
            date.seconds * 1000 + date.nanoseconds / 1000000;
          return moment(timestampInMilliseconds).format("DD MMM YYYY");
        }
        return moment(date).format("DD MMM YYYY");
      };

      // Try to get the latest 'updatedBy' date or fall back to 'createdBy'
      const latestUpdatedDate =
        candidate?.updatedBy?.[candidate.updatedBy.length - 1]?.date;
      if (latestUpdatedDate) {
        return formatTimestamp(latestUpdatedDate);
      }

      // If no valid 'updatedBy' date, fall back to 'createdBy'
      const createdByDate = candidate?.createdBy?.[0]?.date;
      if (createdByDate) {
        return formatTimestamp(createdByDate);
      }

      // If no valid date is found
      return "No valid date found";
    } catch (e) {
      // Log the error to the console
      console.error("Error in handleLatestUpdate:", e.message);

      // Return a user-friendly error message
      return "An error occurred while processing the update date.";
    }
  };

  const handleDeleteLead = (id) => {
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
        dispatch(deleteLeadData(id));
      }
    });
  };

  const handleGoDetailPage = (id) => {
    navigate(`/candidate/detail/${id}`);
  };

  // const  handleUp=  ()=>{

  //   candidateListData?.map(async (candidate,i)=>{
  //     const userDetail = await updateCandidate(
  //       { ...candidate, candidateCode: (i + 1).toString().padStart(2, '0') },
  //       candidate?.id
  //     );

  //   })

  // }

  return (
    <div className="row mt-4">
      <div className="col-12 grid-margin">
        <div className="row">
          {!isCandidateListLoader &&
            candidateListData?.map((candidate) => (
              <div className="col-md-12">
                <div className="card candidate-card shadow-sm rounded mb-4">
                  <div className="card-body">
                    <div className="row mb-4">
                      <div className="col-md-12">
                        <label
                          className={`float-end badge badge-gradient-${
                            handleGetStatusTextColour(candidate?.status)?.color
                          }`}
                        >
                          {handleGetStatusTextColour(candidate?.status)?.label}
                        </label>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <img src={faces} alt={"Anvesh"} />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <span
                              className="card-title mb-1"
                              onClick={() => handleGoDetailPage(candidate?.id)}
                            >
                              {" "}
                              {candidate?.name}
                            </span>
                            <small className="d-flex mt-0 text-muted">
                              {candidate?.candidateCode || "000"}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                        <table className="table table-sm table-borderless table-sm">
                          <tr>
                            <td>
                              <span>Email:</span>
                            </td>
                            <td> {candidate?.email || ""}</td>
                          </tr>
                          <tr>
                            <td>
                              <span>Phone:</span>
                            </td>
                            <td> {candidate?.phone || ""}</td>
                          </tr>
                          <tr>
                            <td>
                              <span>Course:</span>
                            </td>
                            <td>Full Stack Web Developer</td>
                          </tr>
                          <tr>
                            <td>
                              <span>Batch Id:</span>
                            </td>
                            <td>
                              {" "}
                              <BatchOneUp
                                batchListData={batchListData}
                                batchIds={candidate?.batchIds}
                              />
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                        <table className="table table-sm table-borderless table-sm">
                          <tr>
                            <td>
                              <span>Trainer:</span>
                            </td>
                            <td>Anvesh Babu</td>
                          </tr>
                          <tr>
                            <td>
                              <span>Class Type:</span>
                            </td>
                            <td>{getIdByLabel(CLASS_MODE_LIST,candidate?.classMode) || ""}</td>
                          </tr>
                          <tr>
                            <td>
                              <span>Total Fees</span>
                            </td>
                            <td>₹ {candidate?.totfees || ""}</td>
                          </tr>
                          <tr>
                            <td>
                              <span>Pending Fees:</span>
                            </td>
                            <td>
                            ₹ {getPendingPayment(
                                candidate?.billingInfo || [],
                                candidate?.totfees
                              )}
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                        <table className="table table-sm table-borderless table-sm">
                          <tr>
                            <td>
                              <span>Payment Status:</span>
                            </td>
                            <td>
                              {" "}
                              <label
                                className={`text-${
                                  gePaymentStatus(candidate?.paymentStatus)
                                    ?.color
                                }`}
                              >
                                {
                                  gePaymentStatus(candidate?.paymentStatus)
                                    ?.label || ''
                                }
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Next Pay:</span>
                            </td>
                            <td>{candidate?.paymentDueDate}</td>
                          </tr>
                           <tr>
                            <td>
                              <span>Last Login</span>
                            </td>
                            <td>{candidate?.lastLogin? formatTimestamp(candidate?.lastLogin,"DD MMM YYYY HH:mm:ss"):"NA"}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                      {handleGetProjectCompletedCount(
                                candidate?.projects,
                                candidate
                              )}
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* <button onClick={handleUp}>Handle UPdate</button> */}
        
      </div>
    </div>
  );
};
