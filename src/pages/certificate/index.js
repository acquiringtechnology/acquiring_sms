import { CertificateList } from "../../components/pages";
import { Breadcrumb, NormalModal } from "../../components/common";
import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/reducHooks";
import { getAllEmployee } from "../../redux/action/employee.action";
import { getAllBatch } from "../../redux/action/batch.action";

export const CertificateListPage=()=>{
  const dispatch = useAppDispatch();
  const employeeSync = useAppSelector((state) => state.employeeSync);
  const batchSync = useAppSelector((state) => state.batchSync);


  useEffect(() => {
    getEmployeeListData();
  }, []);

  function getEmployeeListData() {
    dispatch(getAllEmployee());
    dispatch(getAllBatch());
  }

    return(
          <div>
              <Breadcrumb
                label={`Certificate `}
                icon="mdi-group"
              
              
              />
        
              <CertificateList
                isBatchListLoader={batchSync?.isBatchListLoader}
                employeeListData={employeeSync?.employeeListData}
                batchListData={batchSync?.batchListData}
              />
        
        
            </div>
    )
}