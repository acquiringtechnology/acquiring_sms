import { NormalSelect, NormalInput, NormalButton } from "../../../../common";
import { EXPENSE_TYPE_LIST } from "../../../../../services/constants";

export const CashExpensesForm = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <NormalSelect
          option={EXPENSE_TYPE_LIST}
          placeholder="Select Expenses Type"
          label="Expenses Type"
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          placeholder="Select Expenses Category"
          label="Expenses Category"
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="Date"
          placeholder="Select Expenses Date"
          label="Expenses Date"
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="number"
          placeholder="Select Expenses Amount"
          label="Expenses Amount"
        />
      </div>
      <div className="col-md-12">
        <NormalInput
          multiline
          rows={3}
          placeholder="Enter Description"
          label="Description"
        />
      </div>

      <div className="col-md-12">
        <NormalButton
          className="me-2 btn-danger"
          //   disabled={batchSync?.isCreateUpdateLoader}
          label="Cancel"
          color="primary"
        />
        <NormalButton
          className="me-2 btn-primary"
          //   disabled={batchSync?.isCreateUpdateLoader}
          //   onClick={handleBatchSubmit}
          // eslint-disable-next-line no-constant-condition
          //   label={`${batchFormObject.id ? "Update" : "Save"} Changes`}
          label={`Save Changes`}
        />
      </div>
    </div>
  );
};
