import { NormalSelect, NormalInput, NormalButton } from "../../../../common";
import {
  EXPENSE_TYPE_LIST,
  EXPENSE_CATEGORY_LIST,
  EXPENSE_CATEGORY_TYPE,
} from "../../../../../services/constants";
import { useState, useRef, useEffect } from "react";
import { expenceModule } from "../../../../../services/module/expence";
import SimpleReactValidator from "simple-react-validator";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reducHooks";
import {
  createNewCashExpenses,
  updateCashExpensesById,
} from "../../../../../redux/action/cashExpenses.action";
import _ from "lodash";
export const CashExpensesForm = ({
  onSucess = () => {},
  editCashExpensesObject = {},
  onClose = () => {},
  cashExpensesSync = {},
}) => {
  const dispatch = useAppDispatch();
  const [, forceUpdate] = useState();
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: "error-message" })
  );
  const [expenseForm, setExpenseForm] = useState({
    ...expenceModule,
  });

  useEffect(() => {
    if (!_.isEmpty(editCashExpensesObject)) {
      console.log("editCashExpensesObject---", editCashExpensesObject);
      setExpenseForm({
        ...expenceModule,
        ...editCashExpensesObject,
      });
    }
  }, [editCashExpensesObject]);

  const handleBatchFormChange = (event) => {
    const { value, checked, type, name } = event.target;
    simpleValidator.current.purgeFields();

    setExpenseForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleExpensesSubmit = async () => {
    try {
      const formValid = simpleValidator.current.allValid();

      if (formValid) {
        simpleValidator.current.hideMessages();
        console.log("= expenseForm?.id--", expenseForm?.id);
        const res = expenseForm?.id
          ? await dispatch(
              updateCashExpensesById({ ...expenseForm }, expenseForm?.id)
            )
          : await dispatch(createNewCashExpenses({ ...expenseForm }));
        onSucess();
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1); // Consider removing this if possible
      }
    } catch (e) {
      // Better logging strategy
      console.error("Error during form submission:", e);
    }
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <NormalSelect
          option={EXPENSE_TYPE_LIST}
          value={expenseForm.type}
          name={"type"}
          onChange={handleBatchFormChange}
          errorMessage={simpleValidator.current.message(
            "Expenses Type",
            expenseForm.type,
            "required"
          )}
          placeholder="Select Expenses Type"
          label="Expenses Type"
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          option={EXPENSE_CATEGORY_LIST}
          value={expenseForm.category}
          name={"category"}
          onChange={handleBatchFormChange}
          errorMessage={simpleValidator.current.message(
            "Expenses Category",
            expenseForm.category,
            "required"
          )}
          placeholder="Select Expenses Category"
          label="Expenses Category"
        />
      </div>
      {expenseForm.category === EXPENSE_CATEGORY_TYPE.DIGITAL_MARKTING && (
        <div className="col-md-6">
          <NormalInput
            placeholder={`Enter Agency Name`}
            label={`Enter Agency Name`}
            value={expenseForm.agencyName}
            name={"agencyName"}
            onChange={handleBatchFormChange}
            errorMessage={simpleValidator.current.message(
              "Agency Name",
              expenseForm.agencyName,
              "required"
            )}
          />
        </div>
      )}
      {expenseForm.category === EXPENSE_CATEGORY_TYPE.MOBILE_RECHARGE && (
        <div className="col-md-6">
          <NormalInput
            placeholder={`Enter Mobile Number`}
            label={`Enter Mobile Number`}
            value={expenseForm.rechargeNumber}
            name={"rechargeNumber"}
            onChange={handleBatchFormChange}
            errorMessage={simpleValidator.current.message(
              "Mobile Number",
              expenseForm.rechargeNumber,
              "required"
            )}
          />
        </div>
      )}

      {expenseForm.category === EXPENSE_CATEGORY_TYPE.META_ADS && (
        <div className="col-md-6">
          <NormalInput
            placeholder={`Enter Meta Ads Acount Name`}
            label={`Enter Meta Ads Acount Name`}
            value={expenseForm.metaAdsAcountName}
            name={"metaAdsAcountName"}
            onChange={handleBatchFormChange}
            errorMessage={simpleValidator.current.message(
              "Meta Ads Acount Name",
              expenseForm.metaAdsAcountName,
              "required"
            )}
          />
        </div>
      )}
      <div className="col-md-6">
        <NormalInput
          type="Date"
          placeholder="Select Expenses Date"
          label="Expenses Date"
          value={expenseForm.date}
          name={"date"}
          onChange={handleBatchFormChange}
          errorMessage={simpleValidator.current.message(
            "Expenses Date",
            expenseForm.date,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="number"
          placeholder="Select Expenses Amount"
          label="Expenses Amount"
          value={expenseForm.amount}
          name={"amount"}
          onChange={handleBatchFormChange}
          errorMessage={simpleValidator.current.message(
            "Expenses Amount",
            expenseForm.amount,
            "required"
          )}
        />
      </div>
      <div className="col-md-12">
        <NormalInput
          multiline
          rows={3}
          placeholder="Enter Description"
          label="Description"
          value={expenseForm.desc}
          name={"desc"}
          onChange={handleBatchFormChange}
          errorMessage={simpleValidator.current.message(
            "Expenses Description",
            expenseForm.desc,
            "required"
          )}
        />
      </div>

      <div className="col-md-12">
        <NormalButton
          className="me-2 btn-danger"
          disabled={cashExpensesSync?.isCreateUpdateLoader}
          label="Cancel"
          color="primary"
          onClick={onClose}
        />
        <NormalButton
          className="me-2 btn-primary"
          isLoader={cashExpensesSync?.isCreateUpdateLoader}
          onClick={handleExpensesSubmit}
          // eslint-disable-next-line no-constant-condition
          label={`${expenseForm?.id ? "Update" : "Save"} Changes`}
        />
      </div>
    </div>
  );
};
