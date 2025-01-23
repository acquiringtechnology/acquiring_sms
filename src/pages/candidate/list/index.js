import { useEffect, useState } from "react";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { CandidateList,LeadFilter } from "../../../components/pages";
import { getAllCandidates } from "../../../redux/action/candidate.action";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { multySearchObjects } from "../../../services/helperFunctions";

export const CandidatePage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [filterObject, setFilterObject] = useState({});
  const [editCandidateObject, setEditCandidateObject] = useState(null);
  const dispatch = useAppDispatch();
  const candidateSync = useAppSelector((state) => state.candidateSync);
  useEffect(() => {
    getCandidateListData();
  }, []);

  function getCandidateListData() {
    dispatch(getAllCandidates());
  }

  const handleSaveCandidate = () => {
    setIsOpenForm(false);
  };

  const handleOpenCandidateModal = () => {
    setIsOpenForm(!isOpenForm);
    setEditCandidateObject(null);
  };

  const handleEditCandidate = (data) => {
    setIsOpenForm(true);
    setEditCandidateObject(data);
  };

  const handleChangeFilter = (filterObj) => {
    setFilterObject(filterObj);
  };
  return (
    <>
      <Breadcrumb
        label={`Candidate ${multySearchObjects(candidateSync?.candidateListData, filterObject).length || 0}`}
        icon="mdi-account-star"
      />

      <LeadFilter candidateListData={candidateSync?.candidateListData} onChange={handleChangeFilter} />

      <CandidateList
        onEdit={handleEditCandidate}
        candidateListData={multySearchObjects(candidateSync?.candidateListData, filterObject)}
        isCandidateListLoader={candidateSync?.isCandidateListLoader}
      />
      <NormalModal
        toggle={handleOpenCandidateModal}
        isShow={isOpenForm}
        title="Candidate Form"
      >
   
      </NormalModal>
    </>
  );
};
