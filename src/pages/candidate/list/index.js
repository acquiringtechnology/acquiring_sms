import { useEffect, useState } from "react";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { CandidateList, CandidateFilter } from "../../../components/pages";
import { getAllCandidates } from "../../../redux/action/candidate.action";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { multySearchObjects } from "../../../services/helperFunctions";
import { getAllBatch } from "../../../redux/action/batch.action";

export const CandidatePage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [filterObject, setFilterObject] = useState({});
  const [editCandidateObject, setEditCandidateObject] = useState(null);
  const dispatch = useAppDispatch();
  const candidateSync = useAppSelector((state) => state.candidateSync);
  const batchSync = useAppSelector((state) => state.batchSync);
  useEffect(() => {
    getCandidateListData();
    handleGetonLoadFunction()
  }, []);

  function getCandidateListData() {
    dispatch(getAllCandidates());
  }

  const handleGetonLoadFunction = () => {
    console.log('handleGetonLoadFunction',batchSync?.batchListData?.length)
    if (batchSync?.batchListData?.length === 0) {
      dispatch(getAllBatch());
    }
  };

  useEffect(()=>{
    console.log('handleGetonLoadFunction',batchSync?.batchListData?.length)
  },[batchSync])

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

const handleGetCandidateFilterObject=()=>{
  
}

  return (
    <>
      <Breadcrumb
        label={`Candidate ${
          multySearchObjects(candidateSync?.candidateListData, filterObject)
            .length || 0
        }`}
        icon="mdi-account-star"
      />

      <CandidateFilter
        candidateListData={candidateSync?.candidateListData}
        onChange={handleChangeFilter}
        batchListData={batchSync.batchListData}
      />

      <CandidateList
        onEdit={handleEditCandidate}
        candidateListData={multySearchObjects(
          candidateSync?.candidateListData,
          filterObject
        )}
        isCandidateListLoader={candidateSync?.isCandidateListLoader}
        batchListData={batchSync.batchListData}
      />
      <NormalModal
        toggle={handleOpenCandidateModal}
        isShow={isOpenForm}
        title="Candidate Form"
      ></NormalModal>
    </>
  );
};
