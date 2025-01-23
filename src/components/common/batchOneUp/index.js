import { getIdByLabel } from "../../../services/helperFunctions";

export const BatchOneUp = ({ batchListData = [], batchIds = [] }) => {
  // Helper function to handle errors and render messages
  const renderErrorMessage = (message) => (
    <span className="text-danger">{message}</span>
  );

  // Validate batch data and batch ids
  if (!Array.isArray(batchListData) || !Array.isArray(batchIds)) {
    return renderErrorMessage("Invalid data provided.");
  }

  // Map batchListData to the required structure for batch ids lookup
  // const batchList = batchListData.map(({ id, batchCode }) => ({
  //   value: id,
  //   label: batchCode,
  // }));

  // Get matching batch data based on batch ids
  const data = getIdByLabel(batchListData, batchIds.map(({ id }) => id));

  // Check if data is valid and render accordingly
  if (!Array.isArray(data) || data.length === 0) {
    return renderErrorMessage("No matching data found for the given batch ids.");
  }

  const firstCourse = data[0]; // First course in the matched data
  const remainingCount = batchIds.length - 1;

  // Handle case where firstCourse is invalid or missing
  if (!firstCourse) {
    return renderErrorMessage("Course data is missing.");
  }

  // Render the first course and the remaining count (if applicable)
  return (
    <>
      <span key={firstCourse}>{firstCourse}</span>
      {remainingCount > 0 && (
        <span className="ms-1 text-primary">+{remainingCount}</span>
      )}
    </>
  );
};
