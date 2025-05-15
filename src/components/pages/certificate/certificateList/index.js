import { NormalButton } from "../../../common";
import React, { useRef } from 'react';
import {
  getIdByLabel,
} from "../../../../services/helperFunctions";
import moment from "moment";
import { COURSE_LIST } from "../../../../services/constants";
import Skeleton from "@mui/material/Skeleton";
import {useNavigate} from 'react-router'
export const CertificateList = ({
  isBatchListLoader = false,
  batchListData = [],
}) => {
  const navigate = useNavigate();


 

  const handleDownloadCertificate=()=>{
    navigate('/certificate/preview/122')
  }
  return (
    <>
    <div className="row">
      {!isBatchListLoader &&
        batchListData?.map((batch) => (
          <div className="col-md-3 mb-4">
            <div className="card rounded border">
              <div className="card-body">
                {/* <label
                  className={`badge badge-gradient-${handleGetStatusTextColour(
                    BATCH_STATUS_LIST,
                    batch?.status
                  )} rounded-pill float-end`}
                >
                  {getBatchStatus(batch?.status)}
                </label> */}
                <h4
                  className="card-title  cursor-pointer"
                //   onClick={() => handleGoDetailPage(batch?.id)}
                >
                  {getIdByLabel(COURSE_LIST, batch?.course)}
                </h4>

                <div className="card-content mt-2">
                  <div className="d-flex align-items-center mb-2">
                    <p className="fw-bold mb-0  text-truncate lh-1">
                      <span className="text-batch-qu"> Certificate ID :</span>
                      <span className="fw-semibold ms-1">
                        {batch?.certCode || "ATCFSWDB1001"}
                      </span>
                    </p>
                  </div>

                  <div className="d-flex align-items-center mb-2">
                    <p className="fw-bold mb-0  text-truncate lh-1">
                      <span className="text-batch-qu"> Batch :</span>
                      <span className="fw-semibold  ms-1">
                        {" "}
                        {batch?.batchCode || 0}
                      </span>
                    </p>
                  </div>

                  <div className="d-flex align-items-center mb-2">
                    <p className="fw-bold mb-0  text-truncate lh-1">
                      <span className="text-batch-qu"> Starting :</span>
                      <span className="fw-semibold  ms-1">
                        {" "}
                        {moment(batch.stDate).format("DD MMM YYYY")}
                      </span>
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <p className="fw-bold mb-0  text-truncate lh-1">
                      <span className="text-batch-qu"> Ending :</span>
                      <span className="fw-semibold  ms-1">
                        {" "}
                        {moment(batch.endDate).format("DD MMM YYYY")}
                      </span>
                    </p>
                  </div>
                 

                  {/* <img className="w-100" src={sampleCertificate} /> */}
                </div>
              </div>

              <div className="card-footer text-center">
                <NormalButton
                  className="btn btn-gradient-success me-2"
                  label="Preview"
                  onClick={handleDownloadCertificate}
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
   
     </>
  );
};
