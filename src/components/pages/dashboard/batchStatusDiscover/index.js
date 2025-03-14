import moment from "moment";
import {
  getBatchStatus,
  getIdByLabel,
  handleGetStatusTextColour,
  getTimePeriodPercentage,
} from "../../../../services/helperFunctions";
import {
    BATCH_STATUS_LIST
  } from "../../../../services/constants";
export const BatchStatusDiscover = ({ batchListData = [] }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="row lead-status-count-section">
          <div className="col-sm-12 col-md-12 col-xxl-12 mb-3 mb-lg-0">
            <h4>Batch Status Discover</h4>
            <p className="text-body-tertiary">Status Breakdown Over Batches</p>
          </div>
          <div className="col-12 table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th> # </th>
                  <th> Batch </th>
                  <th> Time </th>
                  <th> Start Date </th>
                  <th> End Date </th>
                  <th> Status </th>
                </tr>
              </thead>
              <tbody>
                {batchListData?.map((batch,i) => (
                  <tr key={batch?.batchCode}>
                    <td> {i+1}</td>
                    <td> {batch?.batchCode} </td>
                    <td>
                      {" "}
                      {moment(batch?.batSTime, "h:mm").format(
                        "h:mm:ss A"
                      )} To{" "}
                      {moment(batch?.batETime, "h:mm").format("h:mm:ss A")}
                    </td>
                    <td>
                     {moment(batch.stDate).format("DD MMM YYYY")}
                    </td>
                    <td>
                     {moment(batch.endDate).format("DD MMM YYYY")}
                    </td>
                    <td>
                     <label
                                      className={`badge badge-gradient-${handleGetStatusTextColour(
                                        BATCH_STATUS_LIST,
                                        batch?.status
                                      )} rounded-pill float-end`}
                                    >
                                      {getBatchStatus(batch?.status)}
                                    </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
