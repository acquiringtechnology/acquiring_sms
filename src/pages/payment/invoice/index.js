import { useEffect, useState } from "react";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { InvoiceList } from "../../../components/pages";
import { getAllInvoiceList } from "../../../redux/action/invoice.action";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
export const PaymentListPage = () => {
  const dispatch = useAppDispatch();
  const invoiceStateSlice = useAppSelector((state) => state.invoiceStateSlice);

  useEffect(() => {
    getInvoiceListData();
  }, []);

  function getInvoiceListData() {
    if (
      invoiceStateSlice?.invoiceListData?.length === 0 ||
      !invoiceStateSlice?.invoiceListData
    ) {
      dispatch(getAllInvoiceList());
    }
  }

  return (
    <div>
      <Breadcrumb label={`Invoice`} icon="mdi-invoice" />

      <InvoiceList invoiceStateSlice={invoiceStateSlice} />
    </div>
  );
};
