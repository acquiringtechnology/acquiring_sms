import { QUIZ_LIST } from "../../../services/data/quiz";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getStorage } from "../../../services/helperFunctions";
import { EXIST_LOCAL_STORAGE } from "../../../services/constants";
import {
  QuizeComplite,
  QuizeTestCard,
  GetStartQuize,
} from "../../../components/pages";
export const AtQuizPage = () => {
  const [quizeStatus, setQuizeStatus] = useState(0);
  const { quizId } = useParams();
  const [quizList, setQuizList] = useState([]);
  const [quizResultDetail, setQuizResultDetail] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (quizId) {
      const quiz = QUIZ_LIST?.find((quiz) => quiz.id == quizId);
      if (quiz?.questions) {
        setQuizList(quiz?.questions);
      }
    }
  }, [quizId]);

  useEffect(() => {
    try {
      const storedUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
      if (storedUser) {
        const candidateObject = JSON.parse(storedUser);
       
        const isAvilable = candidateObject?.quiz?.findIndex(
          ({ id }) => id == quizId
        );
        console.log(isAvilable)
        if (isAvilable !== -1) {
          Swal.fire({
            title: 'Quiz Completed!',
            text: 'Your quiz is already completed.',
            icon: 'info',
            confirmButtonText: 'Ok',
            showCancelButton: false,
                     }).then((result) => {
            navigate('/atQuiz')
          });
        }
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  const handleQuizSubmit = (detail) => {
    setQuizResultDetail(detail);
    setQuizeStatus(detail.stage);
  };

  return (
    <>
      <Breadcrumb label={`AT Quiz`} icon="mdi-account-star" />
      <div className="row">
        <div className="col-12">
          {quizeStatus === 0 ? (
            <GetStartQuize onQuizeStatusChange={setQuizeStatus} />
          ) : quizeStatus === 1 ? (
            <QuizeTestCard
              quizId={quizId}
              quizData={quizList}
              onQuizeStatusChange={handleQuizSubmit}
            />
          ) : (
            quizeStatus === 2 && (
              <QuizeComplite quizResultDetail={quizResultDetail} />
            )
          )}

          {/* <QuizeTestCard /> */}
          {/* <QuizeComplite/> */}
        </div>
      </div>
    </>
  );
};
