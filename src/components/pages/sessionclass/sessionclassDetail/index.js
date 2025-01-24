import { useState } from "react";
import { NormalButton } from "../../../common";

export const SessionclassDetail = () => {
  const [sessionDetai, setsessionDetai] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const chunkArray = (arr, chunkSize) => {
    let result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const chunks = chunkArray(sessionDetai, 4);
  return (
    <div className="row">
      <div className="col-md-9">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <NormalButton
                  className="me-2 btn-gradient-primary btn-fw float-end"
                  label="Play Recording"
                  color="primary"
                />
                <h3 className="mb-4"> Please watch the recording</h3>
                <hr className="mb-4" />{" "}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <h4 class="card-title text-dark">Today Topic (JAN 22 2025)</h4>
                <p class="mb-0 font-weight-light">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page.
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
            {chunks.map((chunk, index) => (
              <div class="d-flex gap-1 justify-content-center">
                {chunk.map((item, i) => (
                  <div class="d-flex">
                    <div class="seat  cursor-pointer ">{item}</div>
                    <div class="justify-content-center align-items-center mt-3">
                      {i !== 3 && (
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
