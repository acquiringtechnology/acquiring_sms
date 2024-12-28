import { useEffect } from "react";
import { Breadcrumb ,NormalModal } from "../../components/common";
import { LeadList ,LeadForm} from "../../components/pages";
import { getAllLead } from "../../redux/action/lead.action";
import { useAppDispatch, useAppSelector } from "../../hooks/reducHooks";
export const LeadPage = () => {
  const dispatch = useAppDispatch();
  const leadSync = useAppSelector((state) => state.leadSync);
  useEffect(()=>{

    getLeadListData()
  },[]);


  useEffect(()=>{
    console.log('leadSync----',leadSync)

  },[leadSync, leadSync.leadListData])

  function getLeadListData() {
 
    dispatch(getAllLead());
  }
  return (
    <>
      <Breadcrumb label="Lead" icon="mdi-account-star" />

      <LeadList  leadListData={ leadSync?.leadListData} isLeadListLoader={ leadSync?.isLeadListLoader} />
      <NormalModal isShow title='Lead Form'> 

        <LeadForm/>
        </NormalModal>
    </>
  );
};
