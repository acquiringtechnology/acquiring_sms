import { useMemo } from "react";
import { getPendingPayment } from "../../../../services/helperFunctions";
import { PAYMENT_STATUS } from "../../../../services/constants";

export const PaymentStatusDiscover = ({ invoiceListData = [] }) => {
  const getPaymentData = useMemo(() => {
    return (status) => {
      if (!invoiceListData.length) return { amount: 0, count: 0 };
      
      const filteredInvoices = invoiceListData.filter(
        ({ paymentStatus }) => Number(paymentStatus) === Number(status)
      );
      
      const totalPay = filteredInvoices.reduce((total, { billingInfo, totfees = 0 }) => {
        if (status === PAYMENT_STATUS.PENDING) {
          return total + (getPendingPayment(billingInfo, totfees) || 0);
        }
        return total + (billingInfo?.reduce((sum, { payFees }) => sum + (Number(payFees) || 0), 0) || 0);
      }, 0);
      
      return { amount: totalPay, count: filteredInvoices.length };
    };
  }, [invoiceListData]);

  const completedData = getPaymentData(PAYMENT_STATUS.COMPLETED);
  const partialPendingData = getPaymentData(PAYMENT_STATUS.PARTIAL_PENDING);

  const overallPaymentData = {
    amount: completedData.amount + partialPendingData.amount,
    count: completedData.count + partialPendingData.count
  };

  const statusList = [
    { label: "Completed", color: "primary", status: PAYMENT_STATUS.COMPLETED },
    { label: "Pending", color: "info", status: PAYMENT_STATUS.PENDING },
    { label: "Partial Pending", color: "warning", status: PAYMENT_STATUS.PARTIAL_PENDING },
    { label: "Refunded", color: "success", status: PAYMENT_STATUS.REFUNDED },
    { label: "Refunded Pending", color: "secondary", status: PAYMENT_STATUS.REFUNDED_PENDING },
    { label: "Over All", color: "secondary", status: 5, data: overallPaymentData },
  ];

  return (
    <div className="card h-100">
      <div className="card-body">
        <h4>Payment Status Discover</h4>
        <p className="text-body-tertiary">Details across all Branch</p>
        <div className="row g-0">
          {statusList.map(({ label, color, status, data }) => {
            const { amount, count } = data || getPaymentData(status);
            return (
              <div className="col-6 col-xl-4" key={status}>
                <div className={`d-flex flex-column p-3 h-100 border-1 border-end border-translucent`}> 
                  <div className="d-flex align-items-center mb-1">
                    <span className={`square fs-11 me-2 bg-${color}`} />
                    <span className="fs-9 text-body">{count} {label}</span>
                  </div>
                  <h3 className={`fw-semibold text-${color}`}>₹ {amount}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
