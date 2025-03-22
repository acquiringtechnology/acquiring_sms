import { CashExpensesList ,CashExpensesForm } from "../../../components/pages";
import { Breadcrumb, NormalModal} from "../../../components/common";
export const CashExpenses = () => {
  return (
    <>
      <Breadcrumb label={`Cash Expenses `} icon="mdi-account-star" />

      <CashExpensesList />
<NormalModal title='Add Cash Expenses' isShow>
<CashExpensesForm/>
</NormalModal>

    </>
  );
};
