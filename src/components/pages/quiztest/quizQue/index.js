import { useEffect, useState } from "react";
import { NormalButton } from "../../../common";
import { getStorage } from "../../../../services/helperFunctions";
import { EXIST_LOCAL_STORAGE } from "../../../../services/constants";
import { updateCandidate } from "../../../../services/api/candidate";
import { setStorage } from "../../../../services/helperFunctions";
import { useNavigate } from "react-router";
import Swal from "sweetalert2"; 
export const QuizeTestCard = ({
  onQuizeStatusChange = () => {},
  quizData = [],
  quizId = null,
}) => {
  const [selectedQue, setSelectQue] = useState({});
  const [candidateObject, setCandidateObject] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [quizList, setQuizList] = useState(quizData);
  const navigate = useNavigate();
  useEffect(() => {
    if (quizData.length > 0) {
      setSelectQue({ ...quizData[0], setIndex: 0 });
    }

    try {
      const user = JSON.parse(
        getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER) || "{}"
      );
      setCandidateObject({
        quiz: user.quiz || [],
        ...user,
      });
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }, []);

  const handleChangeQus = async () => {
    try{
      const { setIndex } = selectedQue || {};

    if (setIndex >= 0 && setIndex + 1 < quizData.length) {
      setSelectQue({ ...quizData[setIndex + 1], setIndex: setIndex + 1 });
      return;
    }

    const overallCount = quizList.reduce(
      (count, { correct, selAns }) => count + (correct === selAns ? 1 : 0),
      0
    );

    const detail = {
      total: quizList.length,
      correct: overallCount,
      wrong: quizList.length - overallCount,
      stage: 2,
    };
    if (Object.keys(candidateObject).length > 0 && quizId) {

      const isAvilable = candidateObject?.quiz?.findIndex(({id}) => id == quizId);

      if(isAvilable !== -1){
           Swal.fire({
                      title: 'Quiz Completed!',
                      text: 'Your quiz is already completed.',
                      icon: 'info',
                      confirmButtonText: 'Ok',
                      showCancelButton: false,
                               }).then((result) => {
                      navigate('/atQuiz')
                    });
        return;
  
      }

      candidateObject.quiz.push({
        total: quizList.length,
        correct: overallCount,
        timestamp: new Date(),
        status: 1,
        id: Number(quizId),
      });
      setIsLoading(true);
      const userDetail = await updateCandidate(
        { ...candidateObject },
        candidateObject?.userId
      );
      setStorage(
        EXIST_LOCAL_STORAGE.CURRENT_USER,
        JSON.stringify({ ...candidateObject })
      );
      setIsLoading(false);
      console.log("candidateObject----", candidateObject);
    }

    onQuizeStatusChange(detail);
    }catch(e){
      setIsLoading(false);
    }
  };

  const handlePrevChangeQus = () => {
    if (selectedQue && selectedQue.setIndex > 0) {
      const newIndex = selectedQue.setIndex - 1;
      setSelectQue({ ...quizData[newIndex], setIndex: newIndex });
    }

    // onQuizeStatusChange(2)
  };

  const handleChangeAns = (id, i) => {
    try {
      quizList[selectedQue?.setIndex].selAns = id;
      selectedQue.selAns = id;
      setSelectQue({ ...selectedQue });
      setQuizList([...quizList]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container mt-5 quize-container">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10 col-lg-10">
          <div className="border">
            <div className="question bg-white p-3 border-bottom">
              <div className="d-flex flex-row justify-content-between align-items-center mcq">
                <h4>MCQ Quiz</h4>
                <span>
                  ({selectedQue?.setIndex + 1} of {quizData?.length})
                </span>
              </div>
            </div>
            {/* {QUIZ_LIST.map((data, i) => */}
            <div className="question bg-white p-3 border-bottom">
              <div className="d-flex flex-row align-items-center question-title">
                <h3 className="text-danger">Q.</h3>
                <h5 className="mt-1 ml-2">{selectedQue.question}</h5>
              </div>
              <div className="form-group">
                {selectedQue?.answers?.map(({ ans, id }, i) => (
                  <div className="form-check form-check-primary">
                    <div
                      key={i}
                      className="form-check form-check-success"
                      onClick={() => handleChangeAns(id, i)}
                    >
                      <label className="form-check-label">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="ans"
                          id="ans"
                          checked={selectedQue.selAns === id}
                        />{" "}
                        {ans} <i className="input-helper"></i>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* )} */}

            <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
              <NormalButton
                className="btn btn-gradient-danger me-2  btn-icon-text"
                disabled={selectedQue?.setIndex === 0}
                onClick={selectedQue?.setIndex > 0 && handlePrevChangeQus}
                type="button"
                label={
                  <span>
                    {" "}
                    <i class="mdi  mdi-chevron-left"></i> previous
                  </span>
                }
              />
              <NormalButton
                className="btn btn-primary  align-items-center btn-success btn-icon-text"
                disabled={!selectedQue.selAns}
                isLoader={isLoading}
                onClick={selectedQue.selAns && handleChangeQus}
                type="button"
                label={
                  <span>
                    {quizData.length !== selectedQue?.setIndex + 1
                      ? "Next"
                      : "Finish"}
                    <i class="mdi  mdi-chevron-right"></i>
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
