import { EmployeList, EmployeeFrom } from "../../../components/pages";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { useState ,useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import {getAllEmployee} from "../../../redux/action/employee.action";

export const EmployeePage = () => {
  const [isOpenEmployeForm, setIsOpenEmployeForm] = useState(false);
  const dispatch = useAppDispatch();
  const employeeSync = useAppSelector((state) => state.employeeSync);


    useEffect(() => {
      getEmployeeListData();
    }, []);
  
    function getEmployeeListData() {
      dispatch(getAllEmployee());
    }
  const handleOpenEmployeForm = () => {
    setIsOpenEmployeForm(true);
  };
  return (
    <div>
      <Breadcrumb
        label={`Employee `}
        icon="mdi-account-star"
        onClickRightButton={handleOpenEmployeForm}
        rightButtonLabel={
          <>
            <span class="mdi mdi-account-plus-outline"></span> Add Employee
          </>
        }
      />

      <EmployeList  isEmployeeListLoader={employeeSync?.isEmployeeListLoader} employeeListData={employeeSync?.employeeListData}/>

      <NormalModal
        toggle={() => setIsOpenEmployeForm((prevState) => !prevState)}
        title="Add Employee"
        isShow={isOpenEmployeForm}
      >
        <EmployeeFrom
          employeeSync={employeeSync}
          onSucess={() =>{console.log('clos'); setIsOpenEmployeForm(false)}}
          onclose={() => setIsOpenEmployeForm(false)}
        />
      </NormalModal>
    </div>
  );
};
