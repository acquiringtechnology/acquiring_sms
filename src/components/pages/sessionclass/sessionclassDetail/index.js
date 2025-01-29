/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from "react";
import { NormalButton } from "../../../common";
import { convertStringToHTML } from "../../../../services/helperFunctions";
import moment from "moment";

export const SessionclassDetail = ({ batchRecordingData = [] }) => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionList, setSessionList] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const chunks = chunkArray(batchRecordingData, 4);
    setSessionList(chunks);
  }, [batchRecordingData]);

  const chunkArray = (arr, chunkSize) => {
    console.log("chunkArray", arr);
    let result = [];

    let key = 1; // Initialize the global key

    arr?.forEach((_, index) => {
      if (index % chunkSize === 0) {
        // Create chunks of the array
        const chunk = arr.slice(index, index + chunkSize);

        // Add a global `key` to each item inside the chunk
        const chunkWithKeys = chunk.map((item) => ({
          key: key++, // Increment global key for each item
          ...item, // Spread the rest of the properties from the original item
        }));

        result.push(chunkWithKeys);
      }
    });

    console.log("result----", result);

    return result;
  };
  const handleGetSessionDetails = (iteam = null) => {
    console.log("handleGetSessionDetails", iteam);
    setSelectedSession(iteam);
  };
  return (
    <div className="row">
      <div className="col-md-9">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <a
                  className="me-2 btn btn-gradient-primary btn-fw float-end"
                  label=""
                  color="primary"
                  target="_blank"
                  href={selectedSession?.recClassLink || "www.google.com"}
                >
                  {selectedSession?.recClassLink
                    ? "Play Recording"
                    : "Join Class"}
                </a>
                <h3 className="mb-4">
                  {selectedSession?.recClassLink
                    ? "Please watch the recording"
                    : "Join the class on time! "}{" "}
                </h3>
                <hr className="mb-4" />{" "}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <h4 class="card-title text-dark">
                  Today Topic (
                  {moment(selectedSession?.date).format("DD MMM YYYY")})
                </h4>
                <p class="mb-0 font-weight-light">
                  <span
                    className="notes"
                    dangerouslySetInnerHTML={{
                      __html: selectedSession?.topic || "-",
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <h4 class="card-title">Sessions Roadmap</h4>
            {sessionList.map((chunk, index) => (
              <div class="d-flex gap-1 ">
                {chunk.map((item, i) => (
                  <div
                    class="d-flex"
                    onClick={() => handleGetSessionDetails(item)}
                  >
                    <div
                      class={`${
                        item.id === selectedSession?.id ? "seatmark" : "seat"
                      }   cursor-pointer `}
                    >
                      {item?.key}
                    </div>
                    <div class="justify-content-center align-items-center mt-3">
                      {i+1 !==  chunk.length && (
                        <svg
                          class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="HorizontalRuleIcon"
                        >
                          <path fill-rule="evenodd" d="M4 11h16v2H4z"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
