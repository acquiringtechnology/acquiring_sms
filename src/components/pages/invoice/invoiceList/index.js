import { gePaymentStatus  ,getPendingPayment} from "../../../../services/helperFunctions";
// import { useNavigate } from "react-router";
export const InvoiceList = ({ invoiceStateSlice = null }) => {
  // const navigate = useNavigate();

  const handleOpenInvoice=(candidateId)=>{
    window.open(`${window.location.origin}/${`invoiceByCandidate/${candidateId}`}`)
  }
  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th> # </th>
                    <th> Name </th>
                    <th> Fees </th>
                    <th> Pending </th>
                    <th> Status </th>
                    <th> Due Date </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceStateSlice?.invoiceListData?.map((invoice) => (
                    <tr>
                      <td> 1 </td>
                      <td>{invoice?.name}</td>
                      <td> ₹ {invoice?.totfees}</td>
                      <td> ₹ {getPendingPayment(invoice?.billingInfo || [],invoice?.totfees)}</td>
                      <td>
                        <label
                          className={`badge badge-${
                            gePaymentStatus(invoice?.paymentStatus)?.color
                          }`}
                        >
                          {gePaymentStatus(invoice?.paymentStatus)?.label}
                        </label>
                      </td>
                      <td> May 15, 2015 </td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-inverse-primary btn-icon"
                          onClick={()=>handleOpenInvoice(invoice?.id)}
                        >
                          <i title="invoice" className="mdi mdi-invoice text-white-hover"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
