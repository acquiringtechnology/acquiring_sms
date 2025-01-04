import { useEffect, useState } from "react";
import { Breadcrumb, NormalModal } from "../../components/common";
import { LeadList, LeadForm } from "../../components/pages";
import { getAllLead } from "../../redux/action/lead.action";
import { useAppDispatch, useAppSelector } from "../../hooks/reducHooks";

export const LeadPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
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

  return (
    <>
      <Breadcrumb label="Lead" icon="mdi-account-star" />

      <LeadList
        onEdit={handleEditLead}
        leadListData={leadSync?.leadListData}
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
