import { Breadcrumb } from "../../components/common";
import { MyProjectStatus, MyRanking ,LeadStatusDiscover ,BatchStatusDiscover,PaymentStatusDiscover } from "../../components/pages";
import { getAllLead } from "../../redux/action/lead.action";
import { useAppDispatch, useAppSelector } from "../../hooks/reducHooks";
import { getStorage } from "../../services/helperFunctions";
import { EXIST_LOCAL_STORAGE, LOGIN_TYPE } from "../../services/constants";
import { useEffect, useState } from "react";
import { getAllBatch } from "../../redux/action/batch.action";
import { getAllInvoiceList } from "../../redux/action/invoice.action";

export const HomePage = () => {
  const [userDetail, setUserDetail] = useState(null);
    const dispatch = useAppDispatch();
    const leadSync = useAppSelector((state) => state.leadSync);
    const batchSync = useAppSelector((state) => state.batchSync);
    const invoiceStateSlice = useAppSelector((state) => state.invoiceStateSlice);

  useEffect(() => {
    handleGetBatchRecordingList();
    getLeadListData();
    getAllBatchListData();
    getInvoiceListData();
  }, []);

  const handleGetBatchRecordingList = () => {
    let curentUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
    if (curentUser) {
      curentUser = JSON.parse(curentUser);
      setUserDetail(curentUser);
    }
  };

  function getLeadListData() {
  
     if(leadSync?.leadListData.length === 0 || !leadSync?.leadListData){
      dispatch(getAllLead());
    }
   }

 
     function getAllBatchListData() {
      if(batchSync?.batchListData.length === 0 || !batchSync?.batchListData){
       dispatch(getAllBatch());
      }
     }

     
       function getInvoiceListData() {
        if(invoiceStateSlice?.invoiceListData?.length === 0 || !invoiceStateSlice?.invoiceListData)
         dispatch(getAllInvoiceList());
       }

  return (
    <div>
      <Breadcrumb label={`Home`} icon="mdi-home" />
      {userDetail?.loginType === LOGIN_TYPE.CANDIDATE && (
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <MyRanking />
          </div>
          <div className="col-md-8 grid-margin stretch-card">
            <MyProjectStatus />
          </div>
        </div>
      )}

      {userDetail?.loginType === LOGIN_TYPE.EMPLOYEE && (
        <div className="row">
          <div className="col-md-6 mb-4">
            <LeadStatusDiscover leadListData={leadSync?.leadListData || []} />
          </div>
          <div className="col-md-6  mb-4">
            <BatchStatusDiscover   batchListData={batchSync?.batchListData || []} />
          </div>

          <div className="col-md-6  mb-4">
            <PaymentStatusDiscover   invoiceListData={invoiceStateSlice?.invoiceListData || []} />
          </div>
          
        </div>
      )}
    </div>
  );
};
