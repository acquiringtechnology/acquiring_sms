export const BatchRecordList = ({batchRecordingData=[]}) => {
  return (
    <div className="row">
      <div className="card">
        <div className="card-body">
          <table className="table ">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Date</th>
                <th>Link</th>
                {/* <th>Topic</th> */}
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {batchRecordingData?.map((batchRecording,i) =>
               <tr>
               <td>{i+1}</td>
               <td>{batchRecording?.date}</td>
               <td>
                 <a href={batchRecording?.recClassLink} target="_blank">
                   Click Here
                 </a>
               </td>
               {/* <td>{batchRecording?.topic}</td> */}
               <td>
                 <button className="btn btn-sm btn-primary">Edit</button>
                 <button className="btn btn-sm btn-danger ml-2">Delete</button>
               </td>
             </tr>
              )}
             
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
