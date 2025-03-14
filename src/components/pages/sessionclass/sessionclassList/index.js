import { useEffect } from "react";
import { NormalButton } from "../../../common";
import { useNavigate } from "react-router";
import moment from "moment";
import { BATCH_STATUS_LIST } from "../../../../services/constants";
import {
  getBatchStatus,
  handleGetStatusTextColour,
} from "../../../../services/helperFunctions";
export const SessionclassList = ({ batchDetail = null ,isBatchDetailByIdLoader=false }) => {
  const navigate = useNavigate();

  const handleGoDetailPage = () => {
    if(!batchDetail?.id) return console.warn("batch Detail is missing---");
    navigate(`/class/detail/${batchDetail?.id}`);
  };
  return (
    <div className="row">
     {!isBatchDetailByIdLoader && <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <label
              className={`badge float-end badge-gradient-${handleGetStatusTextColour(
                BATCH_STATUS_LIST,
                batchDetail?.status
              )}`}
            >
              {getBatchStatus(batchDetail?.status)}
            </label>
            {/* <h4
                              className="card-title text-primary cursor-pointer"
                              onClick={() => handleGoDetailPage(batch?.id)}
                            ></h4> */}
            <h4 className="card-title">{batchDetail?.batchCode}</h4>
            <div className="d-flex">
              <div className="d-flex align-items-center text-muted font-weight-light">
                <i className="mdi  mdi-calendar icon-sm me-2"></i>
                <span>
                  {" "}
                  {moment(batchDetail?.stDate).format("DD MMM YYYY")} -{" "}
                  {moment(batchDetail?.endDate).format("DD MMM YYYY")}
                </span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 pe-1">
                <img
                  src="https://www.guvi.in/assets/DWZKtEay-laptop-img.webp"
                  className="mb-2 mw-100 w-100 rounded"
                  alt="image"
                />
              </div>
            </div>
            <div className="d-flex mt-5 align-items-top">
              {/* <img src="assets/images/faces/face3.jpg" className="img-sm rounded-circle me-3" alt="image"/> */}
              <div className="mb-0 flex-grow">
                <h5 className="me-2 mb-2">
                  Master Full stack development Program
                </h5>
                <div className="d-flex justify-content-between align-items-baseline">
                  <div className=" text-muted font-weight-light">
                    <i className="mdi mdi-translate icon-sm me-2"></i>
                    <span>Tamil</span>
                  </div>

                  <NormalButton
                    className="me-2 mt-3 btn-gradient-primary float-end btn-rounded btn-fw btn-sm"
                    label="View Course Content"
                    color="primary"
                    onClick={handleGoDetailPage}
                  />
                  {/* </div> */}
                </div>
              </div>
              <div className="ms-auto">
                <i className="mdi mdi-heart-outline text-muted"></i>
              </div>
            </div>
          </div>
        </div>
      </div>}
      {isBatchDetailByIdLoader &&
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title placeholder-glow">
              <span class="placeholder col-6"></span>
            </h4>
            <div className="d-flex">
              <div className="d-flex align-items-center text-muted w-100 font-weight-light placeholder-glow">
                <span class="placeholder col-10"></span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 ">
                <svg
                  class="bd-placeholder-img card-img-top"
                  width="100%"
                  height="260"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#868e96"></rect>
                </svg>
              </div>
            </div>
            <div className="d-flex mt-5 align-items-top">
              {/* <img src="assets/images/faces/face3.jpg" className="img-sm rounded-circle me-3" alt="image"/> */}
              <div className="mb-0 flex-grow">
                <h5 className="me-2 mb-2 placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                </h5>
                <div className="d-flex justify-content-between align-items-baseline placeholder-glow">
                <span class=" col-4"></span>

                <a class="me-2 mt-3 btn-gradient-primary float-end btn-rounded btn-fw btn-sm btn disabled placeholder col-6" aria-disabled="true"></a>
                  {/* </div> */}
                </div>
              </div>
              <div className="ms-auto">
                <i className="mdi mdi-heart-outline text-muted"></i>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};
