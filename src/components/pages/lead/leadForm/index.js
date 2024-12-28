import { NormalInput } from "../../../common";

export const LeadForm = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <NormalInput label='Enter Name' placeholder='Enter Name' />
      </div>
      <div className="col-md-6">
        <NormalInput label='Enter Phone' placeholder='Enter Phone' />
      </div>
      <div className="col-md-6">
        <NormalInput label='Enter Email' placeholder='Enter Email' />
      </div>
    </div>
  );
};
