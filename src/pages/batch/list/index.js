import { BatchList, BatchFrom } from "../../../components/pages";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { getAllEmployee } from "../../../redux/action/employee.action";
import { getAllBatch } from "../../../redux/action/batch.action";

export const BatchPage = () => {
  const [isOpenBatchForm, setIsOpenBatchForm] = useState(false);
  const dispatch = useAppDispatch();
  const employeeSync = useAppSelector((state) => state.employeeSync);
  const batchSync = useAppSelector((state) => state.batchSync);
  const [editBatchObject, setEditBatchObject] = useState(null);

  useEffect(() => {
    getEmployeeListData();
  }, []);

  function getEmployeeListData() {
    dispatch(getAllEmployee());
    if (batchSync?.batchListData.length === 0 || !batchSync?.batchListData) {
      dispatch(getAllBatch());
    }
  }
  const handleOpenEmployeForm = () => {
    setEditBatchObject(null);
    setIsOpenBatchForm(true);
  };

  const handleEditLead = (batch) => {
    setIsOpenBatchForm(true);
    setEditBatchObject(batch);
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

      <BatchList
        isBatchListLoader={batchSync?.isBatchListLoader}
        employeeListData={employeeSync?.employeeListData}
        batchListData={batchSync?.batchListData}
        onEdit={handleEditLead}
      />

      <NormalModal
        toggle={() => setIsOpenBatchForm((prevState) => !prevState)}
        title="Add Batch"
        isShow={isOpenBatchForm}
      >
        <BatchFrom
          batchSync={batchSync}
          employeeListData={employeeSync?.employeeListData}
          editBatchObject={editBatchObject}
          onSucess={() => {
            console.log("clos");
            setIsOpenBatchForm(false);
          }}
          onclose={() => setIsOpenBatchForm(false)}
        />
      </NormalModal>
    </div>
  );
};
