import { useState, useRef, useEffect } from "react";
import { NormalInput, NormalSelect, NormalButton } from "../../../common";
import { leadSchemaModule } from "../../../../services/module/lead";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  COURSE_ENQUIRY_STATUS_LIST,
  LEAD_TYPE_LIST,
  COURSE_LIST,
  COURSE_ENQUIRY_STATUS,
  STATUS,
  PAYMENT_STATUS_LIST,
  BANK_DETAILS_LIST,
  PAYMENT_STATUS,
} from "../../../../services/constants";
import SimpleReactValidator from "simple-react-validator";
import {
  createNewLead,
  updateLeadData,
} from "../../../../redux/action/lead.action";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reducHooks";
import _ from "lodash";
import { candidateSchemaModule } from "../../../../services/module/candidate";
import { createNewCandidate } from "../../../../redux/action/candidate.action";

export const LeadForm = ({
  leadSync,
  editLeadObject = {},
  onSucess = () => {},
  batchListData = [],
}) => {
  const [isLoadingFrom, setIsLoadingFrom] = useState();
  const dispatch = useAppDispatch();
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: "error-message" })
  );
  const [, forceUpdate] = useState();
  const [leadForm, setLeadForm] = useState({
    ...candidateSchemaModule,
    ...editLeadObject,
    ...leadSchemaModule,
  });

  useEffect(() => {
    if (!_.isEmpty(editLeadObject)) {
      if (!Array.isArray(editLeadObject?.comments)) {
        setLeadForm({
          ...candidateSchemaModule,
          ...leadSchemaModule,
          ...editLeadObject,
          comments: leadSchemaModule.comments,
        });
        return;
      }
      setLeadForm({
        ...candidateSchemaModule,
        ...leadSchemaModule,
        ...editLeadObject,
      });
    }
  }, [editLeadObject]);

  const handleLeadFormChange = (event) => {
    const { name, value } = event.target;
    simpleValidator.current.purgeFields();
    setLeadForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddCommentsForm = (data, index) => {
    setLeadForm((prev) => {
      const comments = [...(prev.comments || [])]; // Ensure immutability
      comments[index] = { userId: 0, notes: data, date: new Date() };

      return { ...prev, comments };
    });
  };

  const handlePaymentForm = (event, index) => {
    const { name, value } = event.target;
    setLeadForm((prev) => {
      const billingInfo = [...(prev.billingInfo || [])]; // Ensure immutability
      billingInfo[index] = { ...billingInfo[index], [name]: value };

      return { ...prev, billingInfo };
    });
  };

  const handleAddComments = () => {
    leadForm.comments.push({
      userId: "",
      notes: "",
      date: new Date(),
    });
    setLeadForm({
      ...leadForm,
    });
  };

  const handleleadSubmit = async () => {
    //
    try {
      const formValid = simpleValidator.current.allValid();
      if (formValid) {
        if (leadForm.status === COURSE_ENQUIRY_STATUS.JOINED) {
          handledMoveToCandidate();
        }

        setIsLoadingFrom(true);
        const res = leadForm?.id
          ? await dispatch(updateLeadData(leadForm, leadForm.id))
          : await dispatch(createNewLead(leadForm));

        setLeadForm({ ...candidateSchemaModule });
        onSucess();
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (e) {
      setIsLoadingFrom(false);
    }
  };

  const handledMoveToCandidate = () => {
    const { batchId, batchIds, ...restOfLeadForm } = leadForm;
    const batchDtails = batchListData?.find(({ id }) => id === batchId);
    const trainerId = batchDtails?.trainerIds?.find(
      ({ status }) => status === STATUS.ACTIVE
    )?.trainerId;

    const candidateData = {
      ...candidateSchemaModule,
      ...restOfLeadForm,
      leadId: leadForm.id,
      comments: [],
      updatedBy: [],
      createdBy: {},
      batchIds: [
        {
          id: batchId,
          trainerId,
          sDate: new Date(),
          status: 1,
          eDate: "",
          totfees: 0,
        },
      ],
    };
    dispatch(createNewCandidate(candidateData));
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <NormalInput
          label="Enter Name"
          value={leadForm.name}
          placeholder="Enter Name"
          name="name"
          onChange={handleLeadFormChange}
          errorMessage={simpleValidator.current.message(
            "Name",
            leadForm.name,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Phone"
          name="phone"
          value={leadForm.phone}
          placeholder="Enter Phone"
          onChange={handleLeadFormChange}
          errorMessage={simpleValidator.current.message(
            "Phone",
            leadForm.phone,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Email"
          name="email"
          value={leadForm.email}
          placeholder="Enter Email"
          onChange={handleLeadFormChange}
          errorMessage={simpleValidator.current.message(
            "Email",
            leadForm.email,
            "required|email"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          name="enqDate"
          type="date"
          label="Enter Enquiry Date"
          placeholder="Enter Enquiry Date"
          value={leadForm.enqDate}
          onChange={handleLeadFormChange}
          errorMessage={simpleValidator.current.message(
            "Enquiry Date",
            leadForm.enqDate,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          option={COURSE_LIST}
          name="liveClassId"
          label="Select Course"
          value={leadForm.liveClassId}
          onChange={handleLeadFormChange}
          errorMessage={simpleValidator.current.message(
            "Course",
            leadForm.liveClassId,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          label="Lead Type"
          name="leadType"
          option={LEAD_TYPE_LIST}
          placeholder="Lead Type"
          value={leadForm.leadType}
          onChange={handleLeadFormChange}
          errorMessage={simpleValidator.current.message(
            "Lead Type",
            leadForm.leadType,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="number"
          label="Total Fees"
          placeholder="Total Fees"
          name="totfees"
          value={leadForm.totfees}
          onChange={handleLeadFormChange}
          errorMessage={simpleValidator.current.message(
            "Total Fees",
            leadForm.totfees,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          label="Lead Status"
          placeholder="Lead Status"
          name="status"
          option={COURSE_ENQUIRY_STATUS_LIST}
          value={leadForm.status}
          onChange={handleLeadFormChange}
          errorMessage={simpleValidator.current.message(
            "Lead Status",
            leadForm.status,
            "required"
          )}
        />
      </div>
      {leadForm.status === COURSE_ENQUIRY_STATUS.JOINED && (
        <div className="col-md-6">
          <NormalSelect
            label="Batch"
            placeholder="Select batch"
            name="batchId"
            option={batchListData}
            value={leadForm.batchId}
            onChange={handleLeadFormChange}
            errorMessage={simpleValidator.current.message(
              "Batch",
              leadForm.batchId,
              "required"
            )}
          />
        </div>
      )}
      {leadForm.status === COURSE_ENQUIRY_STATUS.JOINED && (
        <div className="col-md-6">
          <NormalSelect
            label="Payment Status"
            placeholder="Select Payment Status"
            name="paymentStatus"
            option={PAYMENT_STATUS_LIST}
            value={leadForm.paymentStatus}
            onChange={handleLeadFormChange}
            errorMessage={simpleValidator.current.message(
              "Payment Status",
              leadForm.paymentStatus,
              "required"
            )}
          />
        </div>
      )}

      {leadForm.status !== COURSE_ENQUIRY_STATUS.JOINED && (
        <div className="col-md-6">
          <NormalInput
            type="date"
            label="Next Follow up"
            placeholder="Next Follow up"
            name="nextFollUp"
            value={leadForm.nextFollUp}
            onChange={handleLeadFormChange}
            errorMessage={simpleValidator.current.message(
              "Next Follow up",
              leadForm.nextFollUp,
              "required"
            )}
          />
        </div>
      )}
      {leadForm.status === COURSE_ENQUIRY_STATUS.JOINED &&
        (leadForm.paymentStatus === PAYMENT_STATUS.PARTIAL_PENDING ||
          leadForm.paymentStatus === PAYMENT_STATUS.COMPLETED) && (
          <div className="col-md-12 my-4">
            <div className="card border">
              <div className="card-body px-3">
                {/* <h4 className="card-title">Payment Detais</h4> */}
                {leadForm?.billingInfo?.map((payment, i) => (
                  <div className="row">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      <div className="col-md-12">
        <label className="form-label fw-medium">Comment</label>
        {Array.isArray(leadForm?.comments) &&
          leadForm?.comments?.map((comment, i) => (
            <div className="mb-3">
              {/* <CKEditor
              editor={ClassicEditor}
              data={comment.notes}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                console.log(
                  "event------------>",
                  // webinarObjectFrom,
                  editor.getData()
                );
                const data = editor.getData();
                handleAddCommentsForm(data, i);
              }}
            /> */}
              <NormalInput
                multiline
                rows={3}
                placeholder="Next Follow up"
                // name="nextFollUp"
                value={comment.notes}
                onChange={(e) => handleAddCommentsForm(e.target.value, i)}
                errorMessage={simpleValidator.current.message(
                  "Comment",
                  comment.notes,
                  "required"
                )}
              />
              <div className="form-text text-danger"></div>
            </div>
          ))}
      </div>
      <a className="mb-3" onClick={handleAddComments}>
        Add Comment
      </a>
      <div className="col-md-12">
        <NormalButton
          className="me-2 btn-gradient-danger btn-fw"
          disabled={leadSync.isCreateUpdateLoader}
          label="Back"
          color="secondary"
          // onChange={handleLeadFormChange}
        />
        <NormalButton
          className="me-2  btn-gradient-success btn-fw"
          isLoader={leadSync.isCreateUpdateLoader}
          onClick={handleleadSubmit}
          label={`${leadForm.id ? "Update" : "Save"} Changes`}
        />
      </div>
    </div>
  );
};
