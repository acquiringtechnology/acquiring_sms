/* eslint-disable jsx-a11y/img-redundant-alt */
import faces from "../../../../assets/images/faces-clipart/pic-1.png";
import { COURSE_ENQUIRY_STATUS_LIST } from "../../../../services/constants";
import * as moment from "moment";
import Swal from "sweetalert2";
import { deleteLeadData } from "../../../../redux/action/lead.action";
import { useAppDispatch } from "../../../../hooks/reducHooks";
export const LeadList = ({
  leadSync,
  leadListData = [],
  isLeadListLoader = false,
  onEdit = () => {},
}) => {
  const dispatch = useAppDispatch();
  const handleGetStatusTextColour = (status) => {
    const res = COURSE_ENQUIRY_STATUS_LIST.find(
      ({ value }) => value === status
    );
    return res;
  };

  const handleLatestUpdate = (lead) => {
    try {
      if (!lead) throw new Error("Lead data is missing.");

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
        lead?.updatedBy?.[lead.updatedBy.length - 1]?.date;
      if (latestUpdatedDate) {
        return formatTimestamp(latestUpdatedDate);
      }

      // If no valid 'updatedBy' date, fall back to 'createdBy'
      const createdByDate = Array.isArray(lead?.createdBy)
        ? lead?.createdBy?.[0]?.date
        : lead?.createdBy?.date;
      if (createdByDate) {
        return formatTimestamp(createdByDate);
      } else {
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

  return (
    <div className="row">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            {/* <h4 className="card-title">Recent Tickets</h4> */}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th> S.no </th>
                    <th> Name </th>
                    <th> Email </th>
                    <th> Phone </th>
                    <th> Status </th>
                    <th> Last Update </th>
                    <th> Tracking ID </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLeadListLoader &&
                    leadListData?.map((lead, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <img src={faces} className="me-2" alt="image" />{" "}
                          {lead?.name}
                        </td>
                        <td>{lead?.email}</td>
                        <td> {lead?.phone}</td>
                        <td>
                          <label
                            className={`badge badge-gradient-${
                              handleGetStatusTextColour(lead.status)?.color
                            }`}
                          >
                            {handleGetStatusTextColour(lead.status)?.label}
                          </label>
                        </td>
                        <td>{handleLatestUpdate(lead)}</td>
                        <td> WD-12345 </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-success btn-icon me-2"
                            onClick={() => onEdit(lead)}
                          >
                            <i className="mdi mdi-pencil-outline"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger  btn-icon"
                            onClick={() => handleDeleteLead(lead?.id)}
                          >
                            <i className="mdi mdi-delete-outline"></i>
                          </button>
                        </td>
                      </tr>
                    ))}

                  {isLeadListLoader && (
                    <tr>
                      <td colSpan="7" className="text-center">
                        <h4>Loading...</h4>
                      </td>
                    </tr>
                  )}

                  {!isLeadListLoader && leadListData?.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center">
                        <h4>NO Data...</h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
