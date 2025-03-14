import { useMemo } from "react";
import { COURSE_ENQUIRY_STATUS } from "../../../../services/constants";

export const LeadStatusCountCard = ({ leadListData = [] }) => {
  const handleGetLeadStatusCount = useMemo(() => {
    // Ensure leadListData is valid and handle undefined or null items
    return Object.keys(COURSE_ENQUIRY_STATUS).reduce((counts, key) => {
      const statusValue = COURSE_ENQUIRY_STATUS[key];
     console.log('statusValue', statusValue);
     console.log('statusValue',  leadListData?.filter(
      (candidate) =>  candidate?.status == statusValue
    ));
      counts[key] =
      leadListData?.filter(
          (candidate) => candidate?.status && candidate?.status === statusValue
        )?.length || 0;
      return counts;
    }, {});
  }, [leadListData]);

  // Reusable Avatar component
  const AvatarIcon = () => (
    <div className="avatar avatar-lg bg-body text-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fs-4 duo-icon duo-icon-credit-card"
        data-duoicon="credit-card"
      >
        <path
          fill="currentColor"
          d="M22 10v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-7h20Z"
          className="duoicon-secondary-layer"
          opacity=".3"
        ></path>
        <path
          fill="currentColor"
          d="M19 4a3 3 0 0 1 3 3v1H2V7a3 3 0 0 1 3-3h14Zm-1 10h-3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2Z"
          className="duoicon-primary-layer"
        ></path>
      </svg>
    </div>
  );

  const statuses = [
    { label: "Requested", statusKey: "REQUESTED" },
    { label: "Processing", statusKey: "PROCESSING" },
    { label: "Interested", statusKey: "INTERESTED" },
    { label: "Not Interested", statusKey: "NOT_INTERESTED" },
    { label: "Joined", statusKey: "JOINED" },
    { label: "Not Responding", statusKey: "NOT_RESPONDING" },
  ];

  return (
    <div className="row">
      {statuses.map(({ label, statusKey }) => (
        <div
          key={statusKey}
          className="col-12 col-md-6 col-xxl-3 mb-4 mb-xxl-0"
        >
          <div className="card bg-body-tertiary border-transparent">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  {/* Heading */}
                  <h4 className="fs-sm fw-normal text-body-secondary mb-1">
                    {label}
                  </h4>

                  {/* Text */}
                  <div className="fs-4 fw-semibold">
                    {handleGetLeadStatusCount[statusKey] || 0}
                  </div>
                </div>
                <div className="col-auto">
                  {/* Avatar */}
                  <AvatarIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
