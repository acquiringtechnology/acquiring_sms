import { ProfileCard } from "../../../components/pages";
import { Breadcrumb } from "../../../components/common";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { getCandidateDetailById } from "../../../redux/action/candidate.action";
import { useParams } from "react-router";
import { getAllBatch } from "../../../redux/action/batch.action";
export const CandidateDetailPage = () => {
  const candidateSync = useAppSelector((state) => state.candidateSync);
  const dispatch = useAppDispatch();
  const { candidateId } = useParams();
  const batchSync = useAppSelector((state) => state.batchSync);

  useEffect(() => {
    try {
      if (candidateId) {
        dispatch(getCandidateDetailById(candidateId));
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }

    if (batchSync?.batchListData.length === 0) {
      getBatchListData();
    }
  }, []);

  useEffect(() => {
    console.log(
      "candidateSync?.candidateData---",
      candidateSync?.candidateData
    );
  }, [candidateSync?.candidateData]);

  function getBatchListData() {
    dispatch(getAllBatch());
  }

  return (
    <div>
      <Breadcrumb
        label={candidateId ? `Candidate Details` : `My Profile`}
        icon="mdi-account"
      />
      <ProfileCard batchListData={batchSync?.batchListData} isCandidate userDetail={candidateSync?.candidateData} />
      {/* Add your profile page components here */}
    </div>
  );
};
