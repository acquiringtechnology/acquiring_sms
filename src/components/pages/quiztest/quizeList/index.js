import { NormalButton, NoDataFound } from "../../../common";
import { CertificateDoc} from "../../../pages";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Skeleton from "@mui/material/Skeleton";
import { getStorage } from "../../../../services/helperFunctions";
import { EXIST_LOCAL_STORAGE } from "../../../../services/constants";
import noQuizFoundImg from "../../../../assets/images/no Data found/NoQuiz.svg";
import _ from "lodash";
export const QuizList = ({ quizList = [], batchSync = null }) => {
  const navigate = useNavigate();

  const [complitedQuizDetails, setComplitedQuizDetails] = useState([]);

  useEffect(() => {
    try {
      const storedUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.quiz) {
          setComplitedQuizDetails(user?.quiz);
        }
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  const handleGetQuizData = (quizId) => {
    if (complitedQuizDetails?.length)
      return complitedQuizDetails?.find(({ id }) => id === quizId) || {};
  };

  const handleGoDetailPage = (id) => {
    navigate(`/atQuiz/detail/${id}`);
  };
  return !batchSync?.isBatchDetailByIdLoade && quizList?.length > 0 ? (
    <div className="row">
      {quizList?.map((quiz) => {
        const quizData = handleGetQuizData(quiz?.id); // Store the result of handleGetQuizData to avoid multiple calls
        const isQuizCompleted =! _.isEmpty(quizData);

        console.log('isQuizCompleted---',isQuizCompleted)

        return (
          <div className="col-md-3" key={quiz?.id}>
            {" "}
            {/* Add unique key */}
            <div className="card">
              <div className="card-body">
                <label className={`badge badge-gradient-${isQuizCompleted?"success":"info"} float-end`}>
                  {isQuizCompleted?"Complited":"Pending"}
                </label>
                <h4 className="card-title">{quiz?.title}</h4>
                <div className="d-flex">
                  <div className="d-flex align-items-center text-muted font-weight-light">
                    <span>
                      {quiz?.questions?.length} Questions covering the basics of{" "}
                      {quiz?.title?.toLowerCase()}
                    </span>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 pe-1">
                    <img
                      src="https://austingil.com/wp-content/uploads/HTML-Blog-Cover.png"
                      className="mb-2 mw-100 w-100 rounded"
                      alt="image"
                    />
                  </div>
                </div>
                <div className="d-flex mt-5 align-items-top">
                  <div className="mb-0 flex-grow">
                    <div className="d-flex justify-content-between align-items-baseline">
                      <div className="text-muted font-weight-light">
                        Result:{" "}
                        <span>
                          {quizData?.correct || 0} of {quizData?.total || 0}
                        </span>
                      </div>
                      <NormalButton
                        className="me-2 mt-3 btn-gradient-primary float-end btn-rounded btn-fw btn-sm"
                        label={
                          isQuizCompleted ? "Quiz Completed" : "Start Quiz"
                        }
                        color="primary"
                        onClick={
                          !isQuizCompleted
                            ? () => handleGoDetailPage(quiz?.id)
                            : undefined
                        }
                        disabled={isQuizCompleted}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {batchSync?.isBatchDetailByIdLoader &&
        Array.from({ length: 8 }, (_, index) => (
          <div className="col-md-3 mb-4">
            <div className="card rounded border">
              <div className="card-body">
                <Skeleton
                  variant="text"
                  width={"80%"}
                  sx={{ fontSize: "1.125rem" }}
                />
                <Skeleton
                  variant="text"
                  width={"50%"}
                  sx={{ fontSize: "1.125rem" }}
                />

                <div className="card-content mt-2">
                  <Skeleton variant="rectangular" width={"100%"} height={200} />

                  <div className="mt-4">
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={80}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  ) : (
    <>
      <div className="row">
        {batchSync?.isBatchDetailByIdLoader &&
          Array.from({ length: 8 }, (_, index) => (
            <div className="col-md-3 mb-4">
              <div className="card rounded border">
                <div className="card-body">
                  <Skeleton
                    variant="text"
                    width={"80%"}
                    sx={{ fontSize: "1.125rem" }}
                  />
                  <Skeleton
                    variant="text"
                    width={"50%"}
                    sx={{ fontSize: "1.125rem" }}
                  />

                  <div className="card-content mt-2">
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={200}
                    />

                    <div className="mt-4">
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={80}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {!batchSync?.isBatchDetailByIdLoader && (
        <NoDataFound image={noQuizFoundImg} title="No quiz" />
      )}

    </>
  );
};
