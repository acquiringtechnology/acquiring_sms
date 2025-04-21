import { useEffect, useState, useMemo } from "react";
import { Breadcrumb, NormalModal } from "../../components/common";
import { LeadList, LeadForm, LeadFilter } from "../../components/pages";
import { getAllLead } from "../../redux/action/lead.action";
import { getAllBatch } from "../../redux/action/batch.action";
import { useAppDispatch, useAppSelector } from "../../hooks/reducHooks";
import {
  multySearchObjects,
  findLatestDuplicates,
} from "../../services/helperFunctions";

export const LeadPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [filterObject, setFilterObject] = useState({});
  const [editLeadObject, setEditLeadObject] = useState(null);
  const [isShowDublicateList, setIsShowDublicateList] = useState(false);
  const dispatch = useAppDispatch();
  const leadSync = useAppSelector((state) => state.leadSync);
  const batchSync = useAppSelector((state) => state.batchSync);
  useEffect(() => {
    getLeadListData();
    getBatchListData();
  }, []);

  function getLeadListData() {
    dispatch(getAllLead());
  }

  const handleSaveLeade = () => {
    setIsOpenForm(false);
    // getLeadListData();
  };

  function getBatchListData() {
    dispatch(getAllBatch());
  }

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
    setEditLeadObject(null);
  };

  const handleEditLead = (lead) => {
    setIsOpenForm(true);
    setEditLeadObject(lead);
  };

  const handleChangeFilter = (filterObj) => {
    setFilterObject(filterObj);
  };
  const { duplicateCount, duplicatesLeadList } = useMemo(() => {
    if (leadSync?.leadListData?.length > 0) {
      const dups = findLatestDuplicates(
        multySearchObjects(leadSync?.leadListData, filterObject)
      );
      // setLeadDublicateList(dups)
      return {
        duplicateCount: dups.length,
        duplicatesLeadList: dups,
      };
    }
  
    return {
      duplicateCount: 0,
      duplicatesLeadList: [],
    };
  }, [multySearchObjects(leadSync?.leadListData, filterObject)]);
  return (
    <>
      <Breadcrumb
        label={`Lead ${
          multySearchObjects(leadSync?.leadListData, filterObject).length || 0
        }`}
        icon="mdi-account-star"
        onClickRightButton={handleOpenLeadModal}
        rightButtonLabel={
          <>
            <span className="mdi mdi-account-star"></span> Add Lead
          </>
        }
      />

      <LeadFilter
        leadListData={leadSync?.leadListData}
        onChange={handleChangeFilter}
      />
      {duplicateCount > 0 && (
        <div
          class="alert alert-warning alert-dismissible fade show mt-2"
          role="alert"
        >
           <button
            type="button "
            class="btn btn-link-primary position-absolute top-0 end-0"
         
            onClick={() => setIsShowDublicateList(true)}
          >View</button>
          <strong>Duplicate Leads Found!</strong> We found {duplicateCount}{" "}
          duplicates in this lead list. Please review them.
         
        </div>
      )}

      <LeadList
        onEdit={handleEditLead}
        leadListData={multySearchObjects(leadSync?.leadListData, filterObject)}
        isLeadListLoader={leadSync?.isLeadListLoader}
      />
      <NormalModal
        toggle={handleOpenLeadModal}
        isShow={isOpenForm}
        title="Lead Form"
      >
        <LeadForm
          batchListData={batchSync?.batchListData}
          leadSync={leadSync}
          editLeadObject={editLeadObject}
          onSucess={handleSaveLeade}
        />
      </NormalModal>

      <NormalModal
        toggle={()=>setIsShowDublicateList(pr=>!pr)}
        isShow={isShowDublicateList}
        title="Duplict Leads"
        modelStyle={{
          width: "80%",
          height: "100vh",
          // overflowY: "scroll",
          position: "unset",
          margin: "0 auto"
        }}
      >
         <LeadList
        onEdit={()=>{}}
        leadListData={duplicatesLeadList}
        isLeadListLoader={leadSync?.isLeadListLoader}
      />
      </NormalModal>
    </>
  );
};
