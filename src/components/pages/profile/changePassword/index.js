import { useState, useRef, useEffect } from "react";
import {
  getStorage,
  getDisplayName,
} from "../../../../services/helperFunctions";
import { NormalButton, NormalInput, NormalSelect } from "../../../common";
import { candidateSchemaModule } from "../../../../services/module/candidate";
import { indianStatesDistricts } from "../../../../services/data/indianStatesDistricts";
import { updateCandidate } from "../../../../services/api/candidate";
import { EXIST_LOCAL_STORAGE } from "../../../../services/constants";
import { setStorage } from "../../../../services/helperFunctions";
import _, { set } from "lodash";

export const ChangePassword = ({ userDetail = null }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [candidateForm, setcandidateForm] = useState({
    ...candidateSchemaModule,
    ...userDetail,
  });

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
    setError(validatePassword(candidateForm.password)); // Validate on change
    if (confirmPassword) {
      setConfirmError(
        candidateForm.password === confirmPassword
          ? ""
          : "Passwords do not match."
      );
    }
  };

  const handleCandidateSubmit = async () => {
    try {


      if (!error && confirmPassword) {
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
        // onSucess();
      } else {
        setError(validatePassword(candidateForm.password));
      }
    } catch (e) {
      setIsLoading(false);
      // setIsLoadingFrom(false);
    }
  };

  // Password validation function
  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password))
      return "Password must be at least 8 characters long.";
    if (!hasUpperCase.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!hasLowerCase.test(password))
      return "Password must contain at least one lowercase letter.";
    if (!hasNumber.test(password))
      return "Password must contain at least one number.";
    if (!hasSpecialChar.test(password))
      return "Password must contain at least one special character.";

    return ""; // No errors
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmError(
      candidateForm.password === newConfirmPassword ? "" : "Passwords do not match."
    );
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card profile-card">
          <div className="card-body pt-9 pb-0">

            <NormalButton
              isLoader={isLoading}
              className="btn btn-gradient-primary me-2  btn-sm float-end"
              onClick={handleCandidateSubmit}
              label={"Update"}
            />

            <h4 class="card-title mb-4">Change Password</h4>

            <div class="row mb-7">
              <label class="col-lg-4 fw-semibold text-muted">
                New Password
              </label>
              <div class="col-lg-4">
                <NormalInput
                  value={candidateForm.password}
                  placeholder="Enter Name"
                  name="password"
                  onChange={handleInputChange}
                  errorMessage={error}
                />
              </div>
            </div>

            <div class="row mb-7">
              <label class="col-lg-4 fw-semibold text-muted">
              Re-enter password
              </label>

              <div class="col-lg-4">
                <NormalInput
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Re-enter password"
                  errorMessage={confirmError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
