import print_logo from "../../../../assets/images/print_logo.svg";
import {
  getStateById,
  getCityById,
  getPendingPayment,
  getOverAllPayment,
} from "../../../../services/helperFunctions";
import moment from "moment";

import "./invoice.scss";

export const CourseInvoiceDetail = ({
  candidateData = null,
  batchDetail = null,
}) => {
  return (
    // <div className="course-invoice-container">
    <div className="invoice-box">
      <table cellPadding="0" cellSpacing="0" id="invoice-box">
        <tbody>
          <tr className="top">
            <td colSpan="8">
              <table>
                <tbody>
                  <tr>
                    <td className="bb">
                      <p className="images">
                        <img
                          className="logo"
                          src={print_logo}
                          style={{
                            maxHeight: "120px",
                            width: "auto",
                            maxWidth: "250px",
                          }}
                          alt="Logo"
                        />
                      </p>
                    </td>
                    <td className="bb">
                      <p className="innum mb-0">
                        <strong>ORIGINAL FOR RECIPIENT</strong>
                      </p>

                      <h1 className="mt-0">TAX INVOICE</h1>
                      <p className="innum">
                        <strong>Invoice #:</strong>
                        {candidateData?.billingInfo?.[0]?.payDate
                          ? `IN${moment(
                              candidateData.billingInfo[0].payDate
                            ).format("YYYY")}-${candidateData?.candidateCode}`
                          : "N/A"}
                        <br />
                        <strong>Invoice date:</strong>
                        {candidateData?.billingInfo?.[0]?.payDate
                          ? moment(candidateData.billingInfo[0].payDate).format(
                              "DD MMM YYYY"
                            )
                          : "N/A"}
                        <br />
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td width="50%">
                      <p className="infoleft">
                        <strong>Supplier details:</strong>
                      </p>
                      <p className="innumleft">
                        Acquiring Technology
                        <br />
                        PDK Nestle, 1/564, D2,
                        <br />
                        4th Street, Main Road, Krishna Nagar,
                        <br />
                        Perumbakkam, Chennai, Tamil Nadu 600100
                        <br />
                        {/* GSTIN: 06AAFFU9763M1ZE<br />
                            PAN no. AAFFU9763M */}
                      </p>
                    </td>
                    <td width="50%">
                      <p className="inforight">
                        <strong>Recipient details:</strong>
                      </p>
                      <p className="innumright">
                        {candidateData?.name}
                        <br />
                        {candidateData?.email}, {candidateData?.phone}
                        <br />
                        {candidateData?.address}{" "}
                        {getCityById(candidateData?.state, candidateData?.city)}{" "}
                        {getStateById(candidateData?.state)}{" "}
                        {candidateData?.pincode}
                        <br />
                        <br />
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr className="heading-invoice">
            <td>S.No</td>
            <td>Course</td>
            <td style={{ textAlign: "right" }}>Price</td>
            <td style={{ textAlign: "right" }}>Duration</td>
            <td style={{ textAlign: "right" }}>Discount</td>
            <td style={{ textAlign: "right" }}>CGST(9%)</td>
            <td style={{ textAlign: "right" }}>SGST(9%)</td>
            <td style={{ textAlign: "right" }}>Total Amount</td>
          </tr>
          <tr className="item">
            <td style={{ maxWidth: "180px" }}>1</td>
            <td>Full Stack Web Development</td>
            <td style={{ textAlign: "right" }}>₹ {candidateData?.totfees}</td>
            <td style={{ textAlign: "right" }}>90Day's</td>
            <td style={{ textAlign: "right" }}>₹ 0</td>
            <td style={{ textAlign: "right" }}>₹ 0</td>
            <td style={{ textAlign: "right" }}>₹ 0</td>
            <td style={{ textAlign: "right" }}>₹ {candidateData?.totfees}</td>
          </tr>
          <tr className="heading-invoice">
            <td style={{ maxWidth: "180px" }}>Total</td>
            <td style={{ textAlign: "right" }}></td>
            <td style={{ textAlign: "right" }}>₹ {candidateData?.totfees}</td>
            <td style={{ textAlign: "right" }}></td>
            <td style={{ textAlign: "right" }}></td>
            <td style={{ textAlign: "right" }}></td>
            <td style={{ textAlign: "right" }}></td>
            <td style={{ textAlign: "right" }}>₹ {candidateData?.totfees}</td>
          </tr>
          <tr className="heading-invoice bg-success">
            <td
              className="text-success"
              colSpan={7}
              style={{ maxWidth: "180px" }}
            >
              Payed Amount
            </td>
            {/* <td style={{ textAlign: "right" }}></td>
            <td style={{ textAlign: "right" }}></td>
            <td style={{ textAlign: "right" }}></td>
            <td style={{ textAlign: "right" }}></td>
            <td style={{ textAlign: "right" }}></td>
            <td style={{ textAlign: "right" }}></td> */}
            <td className="text-success" style={{ textAlign: "right" }}>
              ₹ {getOverAllPayment(candidateData?.billingInfo || [])}
            </td>
          </tr>
          {getPendingPayment(
            candidateData?.billingInfo || [],
            candidateData?.totfees
          ) > 0 && (
            <tr className="heading-invoice">
              <td
                className="text-danger"
                colSpan={7}
                style={{ maxWidth: "180px" }}
              >
                Pending Amount
              </td>

              <td
                className="text-danger"
                colSpan={7}
                style={{ textAlign: "right" }}
              >
                ₹{" "}
                {getPendingPayment(
                  candidateData?.billingInfo || [],
                  candidateData?.totfees
                )}
              </td>
            </tr>
          )}

          <tr>
            <td colSpan="8" align="right" className="sig-container">
              <p style={{ textAlign: "left" }}>
                <strong>*Notes</strong>
                <br />
                <span>
                  - The batch will start on **{" "}
                  {moment(batchDetail?.stDate).format("MMMM DD, yyyy")}**, from
                  **{moment(batchDetail?.batSTime, "h:mm").format("h:mm A")} To{" "}
                  {moment(batchDetail?.batETime, "h:mm").format("h:mm A")}
                  **. <br />
                  - The link will be shared via email. <br />
                  - Kindly install **Microsoft Teams** beforehand. <br />-
                  Ensure your **internet speed** is stable for a smooth
                  experience.
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan="8" align="right" className="sig-container">
              <p style={{ textAlign: "left" }}>
                <em>
                  This is a system generated invoice and does not require a
                  signature or a digital signature
                </em>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    // </div>
  );
};
