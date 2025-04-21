import { useEffect, useState, useMemo } from "react";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { CandidateList, CandidateFilter } from "../../../components/pages";
import { getAllCandidates } from "../../../redux/action/candidate.action";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import {
  multySearchObjects,
  findLatestDuplicates,
} from "../../../services/helperFunctions";
import { getAllBatch } from "../../../redux/action/batch.action";

export const CandidatePage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [filterObject, setFilterObject] = useState({});
  const [editCandidateObject, setEditCandidateObject] = useState(null);
  const [isShowDublicateList, setIsShowDublicateList] = useState(false);
  const dispatch = useAppDispatch();
  const candidateSync = useAppSelector((state) => state.candidateSync);
  const batchSync = useAppSelector((state) => state.batchSync);
  useEffect(() => {
    getCandidateListData();
    handleGetonLoadFunction();
  }, []);

  function getCandidateListData() {
    dispatch(getAllCandidates());
  }

  const handleGetonLoadFunction = () => {
    console.log("handleGetonLoadFunction", batchSync?.batchListData?.length);
    if (batchSync?.batchListData?.length === 0) {
      dispatch(getAllBatch());
    }
  };

  useEffect(() => {
    console.log("handleGetonLoadFunction", batchSync?.batchListData?.length);
  }, [batchSync]);

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

  const { duplicateCount, duplicatesLeadList } = useMemo(() => {
    if (candidateSync?.candidateListData?.length > 0) {
      const dups = findLatestDuplicates(
        multySearchObjects(candidateSync?.candidateListData, filterObject)
      );
      // setLeadDublicateList(dups)
      console.log(
        dups,'-------dups',
      );
      return {
        duplicateCount: dups.length,
        duplicatesLeadList: dups,
      };
    }

    return {
      duplicateCount: 0,
      duplicatesLeadList: [],
    };
  }, [multySearchObjects(candidateSync?.candidateListData, filterObject)]);

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
      {duplicateCount > 0 && (
        <div
          class="alert alert-warning alert-dismissible fade show mt-3"
          role="alert"
        >
          <button
            type="button "
            class="btn btn-link-primary position-absolute top-0 end-0"
            onClick={() => setIsShowDublicateList(true)}
          >
            View
          </button>
          <strong>Duplicate Leads Found!</strong> We found {duplicateCount}{" "}
          duplicates in this lead list. Please review them.
        </div>
      )}
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

      <NormalModal
        toggle={() => setIsShowDublicateList((pr) => !pr)}
        isShow={isShowDublicateList}
        title="Duplict Candidate List"
        modelStyle={{
          width: "80%",
          height: "100vh",
          // overflowY: "scroll",
          position: "unset",
          margin: "0 auto",
        }}
      >
        <CandidateList
          // onEdit={handleEditCandidate}
          leadListData={duplicatesLeadList}
          isCandidateListLoader={candidateSync?.isCandidateListLoader}
          batchListData={batchSync.batchListData}
        />
      </NormalModal>
    </>
  );
};
