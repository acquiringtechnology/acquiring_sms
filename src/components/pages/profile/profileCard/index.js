/* eslint-disable jsx-a11y/anchor-is-valid */
import face1 from "../../../../assets/images/faces/face1.jpg";
import {
  getStorage,
  getDisplayName,
  letterAvatar,
} from "../../../../services/helperFunctions";
import moment from "moment";
import "./profileCard.scss";
import { CandidateOverview } from "../candidateOverview";
import { CandidateProjects } from "../candidateProjects";
import { Normaltabs } from "../../../common";
import { ChangePassword } from "../changePassword";
import { useState } from "react";
export const ProfileCard = ({ userDetail = null, isCandidate = false }) => {
  const [seletctTab, setSelectTab] = useState(0);

  const tabData = [
    {
      label: "overview",
      value: 0,
    },
    {
      label: "Projects",
      value: 1,
    },
    {
      label: "Change password",
      value: 2,
    },
  ];

  const handleChangeTab = (value) => {
    setSelectTab(value);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card profile-card mb-4">
          <div className="card-body pt-9 pb-0">
            <div className="d-flex mt-2 align-items-top mb-4">
              <img
                src={letterAvatar(
                  isCandidate ? userDetail?.name : getDisplayName(),
                  160
                )}
                className="profile-img me-3"
                alt="image"
              />
              <div className="mb-0 flex-grow">
                <h3 className="me-2 mb-2">{isCandidate ? userDetail?.name : getDisplayName()}</h3>
                <div className="d-flex">
                  <div className="d-flex align-items-center text-muted font-weight-light">
                    <i className="mdi  mdi-calendar icon-sm me-2"></i>
                    <span>
                      Member since,{" "}
                      {moment(userDetail?.enqDate).format("DD MMM YYYY")}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-wrap flex-stack mt-4">
                  <div className="d-flex flex-column flex-grow-1 pe-8">
                    <div className="d-flex flex-wrap">
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-4 me-6 mb-3">
                        <div class="d-flex align-items-center">
                          <i class="mdi mdi-arrow-up-thin fs-3 text-success me-2"></i>{" "}
                          <div class="fs-2 fw-bold counted">0/5</div>
                        </div>
                        <div class="fw-semibold fs-6 text-muted">Project</div>
                      </div>
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-4 me-6 mb-3 ms-2">
                        <div class="d-flex align-items-center">
                          <i class="mdi mdi-arrow-up-thin fs-3 text-success me-2"></i>{" "}
                          <div class="fs-2 fw-bold counted">0%</div>
                        </div>
                        <div class="fw-semibold fs-6 text-muted">Rank Per.</div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
                    <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                      <span className="fw-semibold fs-6 text-gray-500">
                        Profile Compleation
                      </span>
                      <span className="fw-bold fs-6">50%</span>
                    </div>
                    <div class="h-5px mx-3 w-100 bg-light mb-3">
                      <div
                        class="progress h-5px"
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          class="progress-bar bg-gradient-primary h-100"
                          style={{ width: "50%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-auto">
                <i className="mdi mdi-heart-outline text-muted"></i>
              </div>
            </div>
            <Normaltabs data={tabData} onChange={handleChangeTab} />
          </div>
        </div>

        {seletctTab === 0 && <CandidateOverview  isCandidate={isCandidate} userDetail={userDetail} />}
        {seletctTab === 1 && <CandidateProjects userDetail={userDetail} />}
        {seletctTab === 2 && <ChangePassword userDetail={userDetail} />}
      </div>
    </div>
  );
};
