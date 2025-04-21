import { useState, useEffect, useCallback, useRef } from "react";
import { BatchList, BatchFrom } from "../../../components/pages";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { getAllEmployee } from "../../../redux/action/employee.action";
import { getAllBatch } from "../../../redux/action/batch.action";

export const BatchPage = () => {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const [isOpenBatchForm, setIsOpenBatchForm] = useState(false);
  const [editBatchObject, setEditBatchObject] = useState(null);

  const employeeSync = useAppSelector((state) => state.employeeSync);
  const batchSync = useAppSelector((state) => state.batchSync);

  const getEmployeeListData = useCallback(() => {
    dispatch(getAllEmployee());

    const batchListEmpty = !batchSync?.batchListData?.length;
    if (batchListEmpty) {
      dispatch(getAllBatch());
    }
  }, [dispatch, batchSync?.batchListData]);

  useEffect(() => {
    if (!hasFetched.current) {
      getEmployeeListData();
      hasFetched.current = true;
    }
  }, [getEmployeeListData]);

  const handleOpenBatchForm = () => {
    setEditBatchObject(null);
    setIsOpenBatchForm(true);
  };

  const handleEditBatch = (batch) => {
    setEditBatchObject(batch);
    setIsOpenBatchForm(true);
  };

  return (
    <div>
      <Breadcrumb
        label="Batch"
        icon="mdi-group"
        onClickRightButton={handleOpenBatchForm}
        rightButtonLabel={
          <>
            <span className="mdi mdi-group"></span> Add Batch
          </>
        }
      />

      <BatchList
        isBatchListLoader={batchSync?.isBatchListLoader}
        employeeListData={employeeSync?.employeeListData}
        batchListData={batchSync?.batchListData}
        onEdit={handleEditBatch}
      />

      <NormalModal
        toggle={() => setIsOpenBatchForm((prev) => !prev)}
        title="Add Batch"
        isShow={isOpenBatchForm}
      >
        <BatchFrom
          batchSync={batchSync}
          employeeListData={employeeSync?.employeeListData}
          editBatchObject={editBatchObject}
          onSucess={() => setIsOpenBatchForm(false)}
          onclose={() => setIsOpenBatchForm(false)}
        />
      </NormalModal>
    </div>
  );
};
