export const NormalTable = ({
  columnData = [],
  rowData = [],
  renderItem = () => {},
}) => {
  return (
    <table class="table">
      <thead>
        <tr>
          {columnData?.map((column, i) => (
            <th scope="col">{column.lable}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rowData.map(renderItem)}</tbody>
    </table>
  );
};
