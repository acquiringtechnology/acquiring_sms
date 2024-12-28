/* eslint-disable jsx-a11y/img-redundant-alt */
import faces from '../../../../assets/images/faces-clipart/pic-1.png'

export const LeadList=({leadListData=[],isLeadListLoader=false})=>{
    return(
        <div className="row">
              <div className="col-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    {/* <h4 className="card-title">Recent Tickets</h4> */}
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Phone </th>
                            <th> Status </th>
                            <th> Last Update </th>
                            <th> Tracking ID </th>
                            <th> Action </th>
                          </tr>
                        </thead>
                        <tbody>
                            {!isLeadListLoader &&leadListData?.map((lead ,i)=>  <tr>
                            <td key={i}>
                              <img src={faces} className="me-2" alt="image"/> {lead?.name}
                            </td>
                            <td>{lead?.email}</td>
                            <td> {lead?.phone}</td>
                            <td>
                              <label className="badge badge-gradient-success">DONE</label>
                            </td>
                            <td> Dec 5, 2017 </td>
                            <td> WD-12345 </td>
                            <td>
                            <button type="button" className="btn btn-outline-success btn-icon me-2">
                            <i className="mdi mdi-pencil-outline"></i>
                            </button>
                            <button type="button" className="btn btn-outline-danger  btn-icon">
                            <i className="mdi mdi-delete-outline"></i>
                          </button>
                            </td>
                          </tr>)}

                         {isLeadListLoader && <tr>
                            <td colSpan="7" className="text-center"><h4>Loading...</h4></td>
                          </tr>} 
                          
                         

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
}