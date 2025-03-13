import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  limit,
  serverTimestamp,
  query,
  deleteField,
  where,
  getDoc,
} from "firebase/firestore";
import { Toast } from "../../../services/toast";
import { DB_NAME, PAYMENT_STATUS } from "../../constants";

export const getAllInvoice = async () => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(getFirestore(), DB_NAME.CANDIDATE),
        where("paymentStatus", "in", [
          PAYMENT_STATUS.PENDING,
          PAYMENT_STATUS.PARTIAL_PENDING,
          PAYMENT_STATUS.COMPLETED,
          PAYMENT_STATUS.REFUNDED_PENDING,
          PAYMENT_STATUS.REFUNDED,
        ]),
        orderBy("candidateCode", "desc")
      )
    );
    console.log("querySnapshot--", querySnapshot.size);
    const data = querySnapshot.docs
      .map((doc) => {
        const originalCode = doc.data()?.candidateCode || "0"; // Default to "0" if undefined
       
        return (
          doc.data()?.name && {
            ...doc.data(),
            candidateCode: `ATC-FSWD${originalCode}`,
            id: doc.id,
            numericCandidateCode: Number(originalCode), // Store the numeric part for sorting
          }
        );
      })
      .sort((a, b) => a.numericCandidateCode - b.numericCandidateCode); // Sort by numeric value
    console.log("Sorting---", JSON.stringify(data));
    return data;
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};
