import { QuizList } from "../../../components/pages";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { getBatchDetailsById } from "../../../redux/action/batch.action";
import { QUIZ_LIST } from "../../../services/data/quiz";
import { getStorage } from "../../../services/helperFunctions";
import { EXIST_LOCAL_STORAGE, STATUS } from "../../../services/constants";
import { useEffect, useState } from "react";
export const AtQuizeListPage = () => {
  const dispatch = useAppDispatch();
  const batchSync = useAppSelector((state) => state.batchSync);
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    handleGetBatchRecordingList();
  }, []);

  const handleGetBatchRecordingList = () => {
    let curentUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
    if (curentUser) {
      curentUser = JSON.parse(curentUser);
      const batchId = curentUser?.batchIds.find(
        ({ status }) => status === STATUS?.ACTIVE
      )?.id;
      console.log("batchId---", batchId);

      if (batchId) {
        dispatch(getBatchDetailsById(batchId));
      }
    }
  };

  useEffect(() => {
    const { quizIds } = batchSync.batchDetail || {};
  
    // If no quizIds, exit early
    if (!quizIds?.length) return;
  
    // Map quizIds to find the corresponding quiz items from QUIZ_LIST
    const quizItems = quizIds
      .map((quizId) => QUIZ_LIST?.find(({ id }) => id === quizId))
      .filter(Boolean); // Ensure we don't include undefined values
  
    // Update the state only if we have quiz items
    if (quizItems.length) {
      setQuizList(quizItems);
    }
  }, [batchSync.batchDetail]);
  

  return (
    <>
      <Breadcrumb label={`AT Quiz `} icon="mdi-account-star" />
      <QuizList batchSync={batchSync}  quizList={quizList}/>
    </>
  );
};
