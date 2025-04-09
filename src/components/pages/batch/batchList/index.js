import { NormalButton } from "../../../common";
import {
  getBatchStatus,
  getIdByLabel,
  handleGetStatusTextColour,
  getTimePeriodPercentage,
} from "../../../../services/helperFunctions";
import moment from "moment";
import Swal from "sweetalert2";
import { BATCH_STATUS_LIST } from "../../../../services/constants";
import Skeleton from "@mui/material/Skeleton";
import { deleteBatchData } from "../../../../redux/action/batch.action";
import { useAppDispatch } from "../../../../hooks/reducHooks";
import { useNavigate } from "react-router";
export const BatchList = ({
  isBatchListLoader = false,
  batchListData = [],
  employeeListData = [],
  onEdit = () => {},
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteBatch = (id) => {
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
        dispatch(deleteBatchData(id));
      }
    });
  };

  const handleGoDetailPage = (id,batchCode) => {
    navigate(`/batch/detail/${id}?batchCode=${batchCode}`);
  };

  return (
    <div className="row">
      {!isBatchListLoader &&
        batchListData?.map((batch) => (
          <div className="col-md-3 mb-4">
            <div className="card rounded border">
              <div className="card-body">
                <label
                  className={`badge badge-gradient-${handleGetStatusTextColour(
                    BATCH_STATUS_LIST,
                    batch?.status
                  )} rounded-pill float-end`}
                >
                  {getBatchStatus(batch?.status)}
                </label>
                <h4
                  className="card-title text-primary cursor-pointer"
                  onClick={() => handleGoDetailPage(batch?.id,batch?.batchCode)}
                >
                  {batch?.batchCode}
                </h4>

                <div className="card-content mt-2">
                  <div className="d-flex align-items-center mb-2">
                    <p className="fw-bold mb-0  text-truncate lh-1">
                      <span className="text-batch-qu"> Trainer :</span>
                      <span className="fw-semibold text-primary ms-1">
                        {getIdByLabel(employeeListData, batch?.trainerId)}
                      </span>
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="fw-bold mb-0  text-truncate lh-1">
                      <span className="text-batch-qu"> Time :</span>
                      <span className="fw-semibold  ms-1">
                        {" "}
                        {moment(batch?.batSTime, "h:mm").format(
                          "h:mm:ss A"
                        )} To{" "}
                        {moment(batch?.batETime, "h:mm").format("h:mm:ss A")}
                      </span>
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="fw-bold mb-0  text-truncate lh-1">
                      <span className="text-batch-qu"> Total candidates :</span>
                      <span className="fw-semibold  ms-1">
                        {" "}
                        {batch?.countCandidate || 0}
                      </span>
                    </p>
                  </div>

                  <div className="d-flex mt-4 justify-content-between text-body-tertiary fw-semibold">
                    <p className="mb-2"> Progress</p>
                    <p className="mb-2 text-body-emphasis">{getTimePeriodPercentage(
                          batch.stDate,
                          batch.endDate
                        )}</p>
                  </div>
                  <div className="progress" style={{ height: "7px" }}>
                    <div
                      className="progress-bar bg-gradient-success"
                      role="progressbar"
                      style={{
                        width: getTimePeriodPercentage(
                          batch.stDate,
                          batch.endDate
                        ),
                        height: "7px",
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-0 fw-bold fs-9 mb-2">
                      Started :
                      <span className="fw-semibold text-body-tertiary text-opactity-85 ms-1">
                        {" "}
                        {moment(batch.stDate).format("DD MMM YYYY")}
                      </span>
                    </p>
                    <p className="mb-0 fw-bold fs-9">
                      Deadline :{" "}
                      <span className="fw-semibold text-body-tertiary text-opactity-85 ms-1">
                        {moment(batch.endDate).format("DD MMM YYYY")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-footer text-center">
                <NormalButton
                  className="btn btn-gradient-success me-2"
                  label="Edit"
                  onClick={() => onEdit(batch)}
                />
                <NormalButton
                  className="btn btn-gradient-danger"
                  label="Delete"
                  onClick={() => handleDeleteBatch(batch?.id)}
                />
              </div>
            </div>
          </div>
        ))}

      {isBatchListLoader &&
        Array.from({ length: 8 }, (_, index) => (
          <div className="col-md-3 mb-4">
            <div className="card rounded border">
              <div className="card-body">
                <Skeleton
                  variant="text"
                  width={"50%"}
                  sx={{ fontSize: "1.125rem" }}
                />

                <div className="card-content mt-2">
                  <Skeleton variant="rectangular" width={"100%"} height={60} />

                  <Skeleton
                    variant="text"
                    width={"100%"}
                    className="mt-5"
                    sx={{ fontSize: "1rem" }}
                  />

                  <div className="mt-4">
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={60}
                    />
                  </div>
                </div>
              </div>

              <div className="card-footer text-center">
                <Skeleton variant="rectangular" width={"100%"} height={35} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
