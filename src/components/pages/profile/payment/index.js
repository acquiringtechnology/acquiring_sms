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
  PAYMENT_STATUS_LIST,
  BANK_DETAILS_LIST,
  PAYMENT_STATUS,
  PROJECTS_LIST,
  PROJECT_STATUS,
} from "../../../../services/constants";
import _, { set } from "lodash";
import { useParams } from "react-router";

export const PaymentDetails = ({ userDetail = null }) => {
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
      console.log("formValid-----", candidateForm);
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

  const handlePaymentForm = (event, index) => {
    const { name, value } = event.target;
    setcandidateForm((prev) => {
      const billingInfo = [...(prev.billingInfo || [])]; // Ensure immutability
      billingInfo[index] = { ...billingInfo[index], [name]: value };

      return { ...prev, billingInfo };
    });
  };

  const handleAddNewPayment = () => {
    setcandidateForm((prev) => ({
      ...prev,
      billingInfo: [
        ...prev.billingInfo,
        {
          payFees: "",
          payDate: "",
          payedAccount: null,
          payedRef: null,
        },
      ],
    }));
  };

  const handleDeletePayment = (indexToRemove) => {
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
        const updatedPayment = candidateForm.billingInfo.filter(
          (_, index) => index !== indexToRemove
        );
        setcandidateForm({ ...candidateForm, billingInfo: updatedPayment });
      }
    });
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
            <h4 class="card-title mb-4">Payment Details</h4>

            <div class="row mb-7">
              <label class="col-lg-4 fw-semibold text-muted">
                Payment Status
              </label>
              <div class="col-lg-4">
                <NormalSelect
                  // label="Payment Status"
                  placeholder="Select Payment Status"
                  name="paymentStatus"
                  option={PAYMENT_STATUS_LIST}
                  value={candidateForm.paymentStatus}
                  onChange={handleFormChange}
                  errorMessage={simpleValidator.current.message(
                    "Payment Status",
                    candidateForm.paymentStatus,
                    "required"
                  )}
                />
              </div>
            </div>

            {candidateForm.paymentStatus !== PAYMENT_STATUS.COMPLETED && (
              <div className="row">
                <label class="col-lg-4 fw-semibold text-muted">Due Date</label>
                <div class="col-lg-4">
                  <NormalInput
                    type="date"
                    placeholder="Due Date"
                    name="paymentDueDate"
                    value={candidateForm.paymentDueDate}
                    onChange={handleFormChange}
                    errorMessage={simpleValidator.current.message(
                      "Payment Due Dat",
                      candidateForm.paymentDueDate,
                      "required"
                    )}
                  />
                </div>
              </div>
            )}
   {candidateForm.paymentStatus !== PAYMENT_STATUS.PENDING && (          <div className="row">
              <div className="col-md-12 my-4">
                <div className="card border">
                  <div className="card-body px-3">
                    {/* <h4 className="card-title">Payment Detais</h4> */}
                    {candidateForm?.billingInfo?.map((payment, i) => (
                      <div className="row">
                        <div className="col-md-3">
                          <NormalInput
                            type="date"
                            label="Paid Date"
                            placeholder="Paid Date"
                            name="payDate"
                            value={payment.payDate}
                            onChange={(e) => handlePaymentForm(e, i)}
                            errorMessage={simpleValidator.current.message(
                              "Paid Date",
                              payment.payDate,
                              "required"
                            )}
                          />
                        </div>
                        <div className="col-md-3">
                          <NormalSelect
                            label="Bank Name"
                            placeholder="Bank Name"
                            name="payedAccount"
                            option={BANK_DETAILS_LIST}
                            value={payment.payedAccount}
                            onChange={(e) => handlePaymentForm(e, i)}
                            errorMessage={simpleValidator.current.message(
                              "Bank Name",
                              payment.payedAccount,
                              "required"
                            )}
                          />
                        </div>
                        <div className="col-md-3">
                          <NormalInput
                            type="number"
                            label="Paid Amount"
                            placeholder="Paid Amount"
                            name="payFees"
                            value={payment.payFees}
                            onChange={(e) => handlePaymentForm(e, i)}
                            errorMessage={simpleValidator.current.message(
                              "Paid Amount",
                              payment.payFees,
                              "required"
                            )}
                          />
                        </div>
                        <div className="col-md-3">
                          <NormalInput
                            type="text"
                            label="Paid Ref Number"
                            placeholder="Paid Ref Number"
                            name="payedRef"
                            value={payment.payedRef}
                            onChange={(e) => handlePaymentForm(e, i)}
                            errorMessage={simpleValidator.current.message(
                              "Paid Ref Number",
                              payment.payedRef,
                              "required"
                            )}
                          />
                        </div>
                        <div className="col-md-12 text-end">
                          {candidateForm?.billingInfo?.length === i + 1 && (
                            <button
                              type="button"
                              class="btn btn-sm text-primary btn-link"
                              onClick={handleAddNewPayment}
                            >
                              Add
                            </button>
                          )}

                          {candidateForm?.billingInfo?.length > 1 && (
                            <button
                              type="button"
                              class="btn btn-sm btn-link text-danger"
                              onClick={() => handleDeletePayment(i)}
                            >
                              Delete
                            </button>
                          )}
                          {candidateForm?.billingInfo?.length !== i + 1 && (
                            <hr />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};
