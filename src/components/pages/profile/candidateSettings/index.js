import { useState, useRef, useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  getStorage,
  getDisplayName,
} from "../../../../services/helperFunctions";
import {
  NormalButton,
  NormalInput,
  NormalSelect,
  NormalCheckbox,
} from "../../../common";
import { candidateSchemaModule } from "../../../../services/module/candidate";
import Swal from "sweetalert2";
import { updateCandidateDetailById } from "../../../../redux/action/candidate.action";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reducHooks";
import {
  COURSE_ENQUIRY_STATUS_LIST,
  CANDIDATE_CLASS_STATUS_LIST
} from "../../../../services/constants";
import _, { set } from "lodash";
import { useParams } from "react-router";

export const CandidateSettings = ({ userDetail = null }) => {
  const { candidateId } = useParams();
  const dispatch = useAppDispatch();
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: "error-message" })
  );
  const [, forceUpdate] = useState();
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

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setcandidateForm((prevState) => ({ ...prevState, [name]: value }));
    simpleValidator.current.purgeFields();
  };

  const handleCandidateSubmit = async () => {
    try {
      // simpleValidator.current.purgeFields();
      const formValid = simpleValidator.current.allValid();
      if (formValid) {
        setIsLoading(true);
        const userDetail = await dispatch(
          updateCandidateDetailById(
            { ...candidateForm },
            candidateForm?.userId || candidateId
          )
        );

        setIsLoading(false);
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1); // Consider removing this if possible
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
            <NormalButton
              isLoader={isLoading}
              className="btn btn-gradient-primary me-2  btn-sm float-end"
              onClick={handleCandidateSubmit}
              label={"Update"}
            />
            <h4 class="card-title mb-4">Candidate Setting</h4>

            <div class="row mb-7">
             
              <div class="col-lg-4">
                <NormalSelect
                  label="Status"
                  placeholder="Select Candidate Status"
                  name="Candidate Status"
                  option={CANDIDATE_CLASS_STATUS_LIST}
                  value={candidateForm.status}
                  onChange={handleFormChange}
                  errorMessage={simpleValidator.current.message(
                    "Candidate Status",
                    candidateForm.status,
                    "required"
                  )}
                />
              </div>
            </div>

  
          </div>
        </div>
      </div>
    </div>
  );
};
