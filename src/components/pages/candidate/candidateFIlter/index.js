import { NormalSearch, NormalSelect, NormalButton } from "../../../common";
import { PAYMENT_STATUS_LIST,PROJECTS_LIST } from "../../../../services/constants";
import { useState } from "react";

export const CandidateFilter = ({ onChange = () => {}, batchListData = [] }) => {
  const [filterObject, setFilterObject] = useState({
    name: "",
    branch: "",
    batchId: "",
    paymentStatus: "",
    projectId:""
  });

  const handleInputChange = (event) => {
    const {
      target: { value, checked, type, name },
    } = event;

    const filterValue = {
      ...filterObject,
      [name]: type === "checkbox" ? checked : value,
    };

    setFilterObject(filterValue);

    onChange(filterValue);
  };

  const handleClearFilter = () => {
    const filterValue = {
      name: "",
      branch: "",
      batchId: "",
      paymentStatus: "",
      projectId:""
    };
    onChange(filterValue);
    setFilterObject(filterValue);
  };
  return (
    <div className="row">
      <div className="col-md-4">
        <NormalSearch
          placeholder="Name"
          name="name"
          value={filterObject.name}
          onChange={handleInputChange}
        />
      </div>
      {/* <div className="col-md-2">
        <NormalSelect
          isLabel={false}
          label="Branch"
          name="branch"
          value={filterObject.branch}
          onChange={handleInputChange}
          option={BRANCH_LIST}
        />
      </div> */}
      <div className="col-md-2">
        <NormalSelect
          isLabel={false}
          label="Batch"
          option={batchListData}
          name="batchId"
          value={filterObject.batchId}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-2">
        <NormalSelect
          option={PAYMENT_STATUS_LIST}
          isLabel={false}
          name="paymentStatus"
          value={filterObject.paymentStatus}
          onChange={handleInputChange}
          label="Payment Status"
        />
      </div>
      <div className="col-md-2">
        <NormalSelect
          option={PROJECTS_LIST[0]?.projectList}
          isLabel={false}
          name="projectId"
          value={filterObject.projectId}
          onChange={handleInputChange}
          label="Project"
        />
      </div>
      <div className="col-md-2">
        {/* <NormalButton label="Search" /> */}
        <NormalButton
          className=" ms-3 btn btn-secondary"
          onClick={handleClearFilter}
          label="Clear"
        />
      </div>
    </div>
  );
};
