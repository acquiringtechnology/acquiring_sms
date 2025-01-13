import { BatchList, BatchFrom } from "../../../components/pages";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { useState ,useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import {getAllEmployee} from "../../../redux/action/employee.action";

export const BatchPage = () => {
  const [isOpenBatchForm, setIsOpenBatchForm] = useState(false);
  const dispatch = useAppDispatch();
  const employeeSync = useAppSelector((state) => state.employeeSync);


    useEffect(() => {
      getEmployeeListData();
    }, []);
  
    function getEmployeeListData() {
      dispatch(getAllEmployee());
    }
  const handleOpenEmployeForm = () => {
    setIsOpenBatchForm(true);
  };
  return (
    <div>
      <Breadcrumb
        label={`Batch `}
        icon="mdi-group"
        onClickRightButton={handleOpenEmployeForm}
        rightButtonLabel={
          <>
            <span class="mdi mdi-group"></span> Add Batch
          </>
        }
      />

      <BatchList  isEmployeeListLoader={employeeSync?.isEmployeeListLoader} employeeListData={employeeSync?.employeeListData}/>

      <NormalModal
        toggle={() => setIsOpenBatchForm((prevState) => !prevState)}
        title="Add Batch"
        isShow={isOpenBatchForm}
      >
        <BatchFrom employeeListData={employeeSync?.employeeListData}/>
      
      </NormalModal>
    </div>
  );
};
