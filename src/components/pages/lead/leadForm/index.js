import { useState } from "react";
import { NormalInput, NormalSelect, NormalButton } from "../../../common";

export const LeadForm = () => {
  const [isLoadingFrom, setIsLoadingFrom] = useState();

  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    enquiryDate: "",
    courseId: "",
    leadType: "",
    totalFees: 0,
    leadStatus: "",
    notes: "",
  });

  const courseList = [{ value: "fullstack", label: "Full Stack" }];

  const handleLeadFormChange = (event) => {
    const { name, value } = event.target;
    setLeadForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveLeadFormChange = (event) => {
    console.log(`Lead's`, leadForm);
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
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Phone"
          name="phone"
          value={leadForm.phone}
          placeholder="Enter Phone"
          onChange={handleLeadFormChange}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Email"
          name="email"
          value={leadForm.email}
          placeholder="Enter Email"
          onChange={handleLeadFormChange}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          name="enquiryDate"
          type="date"
          label="Enter Enquiry Date"
          placeholder="Enter Enquiry Date"
          value={leadForm.enquiryDate}
          onChange={handleLeadFormChange}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          option={courseList}
          name="courseId"
          label="Select Course"
          value={leadForm.courseId}
          onChange={handleLeadFormChange}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          option={courseList}
          label="Lead Type"
          name="leadType"
          placeholder="Lead Type"
          value={leadForm.leadType}
          onChange={handleLeadFormChange}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="number"
          label="Total Fees"
          placeholder="Total Fees"
          name="totalFees"
          value={leadForm.totalFees}
          onChange={handleLeadFormChange}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          option={courseList}
          label="Lead Status"
          placeholder="Lead Status"
          name="leadStatus"
          value={leadForm.leadStatus}
          onChange={handleLeadFormChange}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="date"
          label="Next Follow up"
          placeholder="Next Follow up"
          name="nextFollow"
          value={leadForm.nextFollow}
          onChange={handleLeadFormChange}
        />
      </div>
      <div className="col-md-12">
        <NormalInput
          value={leadForm.notes}
          name="notes"
          multiline
          rows={3}
          label="Next Follow up"
          placeholder="Next Follow up"
          onChange={handleLeadFormChange}
        />
      </div>
      <div className="col-md-12">
        <NormalButton
          className="me-2 btn-gradient-danger btn-fw"
          disabled={isLoadingFrom}
          label="Back"
          color="secondary"
          // onChange={handleLeadFormChange}
        />
        <NormalButton
          className="me-2  btn-gradient-success btn-fw"
          isLoader={false}
          onClick={handleSaveLeadFormChange}
          label="Update Changes"
        />
      </div>
    </div>
  );
};
