import { useEffect, useState } from "react";
import { Breadcrumb, NormalModal } from "../../components/common";
import { LeadList, LeadForm, LeadFilter } from "../../components/pages";
import { getAllLead } from "../../redux/action/lead.action";
import { useAppDispatch, useAppSelector } from "../../hooks/reducHooks";
import { multySearchObjects } from "../../services/helperFunctions";


export const LeadPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [filterObject, setFilterObject] = useState({});
  const [editLeadObject, setEditLeadObject] = useState(null);
  const dispatch = useAppDispatch();
  const leadSync = useAppSelector((state) => state.leadSync);
  useEffect(() => {
    getLeadListData();
  }, []);

  function getLeadListData() {
    dispatch(getAllLead());
  }

  const handleSaveLeade = () => {
    setIsOpenForm(false);
    // getLeadListData();
  };

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
  return (
    <>
      <Breadcrumb
        label={`Lead ${multySearchObjects(leadSync?.leadListData, filterObject).length || 0}`}
        icon="mdi-account-star"
      />

      <LeadFilter leadListData={leadSync?.leadListData} onChange={handleChangeFilter} />

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
          leadSync={leadSync}
          editLeadObject={editLeadObject}
          onSucess={handleSaveLeade}
        />
      </NormalModal>
    </>
  );
};
