/* eslint-disable jsx-a11y/img-redundant-alt */
import { NormalTable } from "../../../components/common";

export const UserPage = () => {
  const list = [
    {
      name: "Kaml",
      age: 28,
      email: "Kaml@gmail.com",
    },
    {
      name: "Rajani",
      age: 25,
      email: "Arun@gmail.com",
    },
    {
      name: "Surya",
      age: 28,
      email: "Surya@gmail.com",
    },
  ];

  const userHeader = [
    {
      lable: "S.no",
    },
    {
      lable: "Name",
    },
    {
      lable: "Email",
    },
    {
      lable: "Phone",
    },
    {
      lable: "Designasion",
    },
    {
      lable: "Status",
    },
  ];

  return (
    <div>
      <h1>User Page</h1>

      <NormalTable
        columnData={userHeader}
        rowData={list}
        renderItem={(item, i) => (
          <tr>
            <td>
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                class="me-2"
                alt="image"
              />{" "}
             {item.name}
            </td>
            <td> Fund is not recieved </td>
            <td>
              <label class="badge badge-gradient-success">DONE</label>
            </td>
            <td> Dec 5, 2017 </td>
            <td> WD-12345 </td>
          </tr>
        )}
      />
    </div>
  );
};
