import { Breadcrumb } from "../../components/common";
import { NormalTable } from "../../components/common";
export const LeadPage = () => {
  const list = [
    {
      name: "Anvesh",
      age: 28,
      email: "anvesh@gmail.com",
    },
    {
      name: "Arun",
      age: 25,
      email: "Arun@gmail.com",
    },
    {
      name: "Kumar",
      age: 28,
      email: "Kumar@gmail.com",
    },
  ];
  const leadHeader = [
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
      lable: "Cousre",
    },
    {
      lable: "Status",
    },
    {
      lable: "Action",
    },
  ];

  return (
    <>
      <Breadcrumb label="Lead" icon="mdi-account-star" />

      <NormalTable
        columnData={leadHeader}
        rowData={list}
        renderItem={(item, i) => (
          <tr>
            <td>{item.name}</td>
            <td> Fund is not recieved </td>
            <td>
              <label class="badge badge-gradient-success">DONE</label>
            </td>
            <td> Dec 5, 2017 </td>
            <td> WD-12345 </td>
          </tr>
        )}
      />
    </>
  );
};
