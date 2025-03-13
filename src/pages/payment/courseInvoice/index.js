import { CourseInvoiceDetail } from "../../../components/pages";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { STATUS } from "../../../services/constants";
import { getCandidateDetailById } from "../../../redux/action/candidate.action";
import { getBatchDetailsById } from "../../../redux/action/batch.action";
import { useParams } from "react-router";
export const CourseInvoice = () => {
  const candidateSync = useAppSelector((state) => state.candidateSync);
  const batchSync = useAppSelector((state) => state.batchSync);
  const dispatch = useAppDispatch();
  const { candidateId } = useParams();

  useEffect(() => {
    try {
      if (candidateId) {
        dispatch(getCandidateDetailById(candidateId));
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    handleGetBatchDetails();
  }, [candidateSync?.candidateData]);

  const handleGetBatchDetails = () => {
    if (candidateSync?.candidateData) {
      const batchId = candidateSync?.candidateData?.batchIds.find(
        ({ status }) => status === STATUS?.ACTIVE
      )?.id;
      if (batchId) {
        dispatch(getBatchDetailsById(batchId));
      }
    }
  };

  return (
    <div>
      <CourseInvoiceDetail batchDetail={batchSync?.batchDetail} candidateData={candidateSync?.candidateData} />
    </div>
  );
};
