import { useState, useRef, useEffect } from "react";
import {
  getStorage,
  getDisplayName,
} from "../../../../services/helperFunctions";
import SimpleReactValidator from "simple-react-validator";
import { NormalButton, NormalInput, NormalSelect } from "../../../common";
import { candidateSchemaModule } from "../../../../services/module/candidate";
import { indianStatesDistricts } from "../../../../services/data/indianStatesDistricts";
import { updateCandidate } from "../../../../services/api/candidate";
import { EXIST_LOCAL_STORAGE } from "../../../../services/constants";
import { setStorage } from "../../../../services/helperFunctions";
import _ from "lodash";

export const CandidateOverview = ({ userDetail = null ,isCandidate=false }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [candidateForm, setcandidateForm] = useState({
    ...candidateSchemaModule,
    ...userDetail,
  });
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: "error-message" })
  );
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (!_.isEmpty(userDetail)) {
      setcandidateForm(userDetail);
    }
  }, [userDetail]);

  const handleInputChange = (event) => {
    setcandidateForm({
      ...candidateForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleCandidateSubmit = async () => {
    try {
      const formValid = simpleValidator.current.allValid();

      if (formValid) {
        setIsLoading(true);
        const userDetail = await updateCandidate(
          { ...candidateForm },
          candidateForm?.userId
        );
        setStorage(
          EXIST_LOCAL_STORAGE.CURRENT_USER,
          JSON.stringify({ ...candidateForm })
        );
        setIsLoading(false);
        setIsEdit(false);
        // onSucess();
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (e) {
      setIsLoading(false);
      // setIsLoadingFrom(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card profile-card">
          <div className="card-body pt-9 pb-0">
            {!isEdit && (
              <NormalButton
                className="btn btn-gradient-primary btn-sm float-end"
                onClick={() => setIsEdit(true)}
                label={"Edit"}
              />
            )}

            {isEdit && (
              <NormalButton
                disabled={isLoading}
                className="btn btn-gradient-danger btn-sm float-end"
                onClick={() => setIsEdit(false)}
                label={"Cancel"}
              />
            )}

            {isEdit && (
              <NormalButton
              isLoader={isLoading}
                className="btn btn-gradient-primary me-2  btn-sm float-end"
                onClick={handleCandidateSubmit}
                label={"Update"}
              />
            )}

            <h4 class="card-title mb-4">Profile Details</h4>

            <div class="row mb-7">
              <label class="col-lg-4 fw-semibold text-muted">Full Name</label>

              {isEdit ? (
                <div class="col-lg-4">
                  {" "}
                  <NormalInput
                    value={candidateForm.name}
                    placeholder="Enter Name"
                    name="name"
                    onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message(
                      "name",
                      candidateForm.name,
                      "required"
                    )}
                  />
                </div>
              ) : (
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">
                    {isCandidate ? userDetail?.name : getDisplayName()}
                  </span>
                </div>
              )}
            </div>

            <div class="row mb-7">
              <label class="col-lg-4 fw-semibold text-muted">Email</label>
              {isEdit ? (
                <div class="col-lg-4">
                  <NormalInput
                    value={candidateForm.email}
                    placeholder="Enter Email"
                    name="email"
                    onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message(
                      "email",
                      candidateForm.email,
                      "required|email"
                    )}
                  />
                </div>
              ) : (
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">
                    {userDetail?.email}
                  </span>
                </div>
              )}
            </div>
            <div class="row mb-7">
              <label class="col-lg-4 fw-semibold text-muted">
                Contact Phone
              </label>
              {isEdit ? (
                <div class="col-lg-4">
                  <NormalInput
                    value={candidateForm.phone}
                    placeholder="Enter Phone"
                    name="phone"
                    onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message(
                      "phone",
                      candidateForm.phone,
                      "required|phone"
                    )}
                  />
                </div>
              ) : (
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">
                    {userDetail?.phone}
                  </span>
                </div>
              )}
            </div>

            {isEdit && (
              <div class="row mb-7">
                <label class="col-lg-4 fw-semibold text-muted">State</label>

                <div class="col-lg-4">
                  <NormalSelect
                    option={indianStatesDistricts?.states}
                    value={candidateForm.state}
                    placeholder="Enter State"
                    name="state"
                    onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message(
                      "State",
                      candidateForm.state,
                      "required"
                    )}
                  />
                </div>
              </div>
            )}

            <div class="row mb-7">
              <label class="col-lg-4 fw-semibold text-muted">City</label>
              {isEdit ? (
                <div class="col-lg-4">
                  <NormalSelect
                    value={candidateForm.city}
                    option={
                      indianStatesDistricts?.states?.find(
                        (state) => state.value === candidateForm.state
                      )?.districts
                    }
                    placeholder="Enter City"
                    name="city"
                    onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message(
                      "City",
                      candidateForm.city,
                      "required"
                    )}
                  />
                </div>
              ) : (
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">
                    {userDetail?.city}
                  </span>
                </div>
              )}
            </div>

            {isEdit && (
              <div class="row mb-7">
                <label class="col-lg-4 fw-semibold text-muted">Pincode</label>

                <div class="col-lg-4">
                  <NormalInput
                    value={candidateForm.pincode}
                    placeholder="Enter Pincode"
                    name="pincode"
                    onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message(
                      "pincode",
                      candidateForm.pincode,
                      "required"
                    )}
                  />
                </div>
              </div>
            )}
            <div class="row mb-7">
              <label class="col-lg-4 fw-semibold text-muted">Address</label>
              {isEdit ? (
                <div class="col-lg-4">
                  <NormalInput
                    value={candidateForm.address}
                    placeholder="Enter Address"
                    name="address"
                    onChange={handleInputChange}
                    errorMessage={simpleValidator.current.message(
                      "address",
                      candidateForm.address,
                      "required"
                    )}
                  />
                </div>
              ) : (
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">
                    {userDetail?.address} {userDetail?.state}{" "}
                    {userDetail?.pincode}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
