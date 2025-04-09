import {
    collection,
    getDocs,
    getFirestore,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    serverTimestamp,
    query,
    orderBy,
    limit,
    getDoc
  } from "firebase/firestore";
  import { Toast } from "../../../services/toast";
  import { DB_NAME } from "../../constants";


  export const getAllCashExpensesList = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(getFirestore(), DB_NAME.CASH_EXPENSES)
      );
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        // value:doc.id,
        // label:doc.data().batchCode,
      }));
      return data;
    } catch (e) {
      console.error("Error fetching leads:", e);
      let message = e?.message || "Something went wrong";
      Toast({ message, type: "error" });
      throw e; // Propagate error to be handled by the caller
    }
  };

   export const createCashExpenses = async (body) => {
      try {
        const userReq = {
          ...body,
          createdBy: {
            name: `Anvesh Babu`,
            user_id: "guest",
            date: serverTimestamp(),
          },
        };
        console.log('userReq----',userReq)
        const docRef = await addDoc(
          collection(getFirestore(), DB_NAME?.CASH_EXPENSES),
          userReq
        );
        Toast({ message: "Cash Expenses Add successfully" });
        return{id: docRef.id,...userReq}
      } catch (e) {
        console.error("Error fetching Batch:", e);
        let message = e?.message || "Something went wrong";
        Toast({ message, type: "error" });
        throw e; // Propagate error to be handled by the caller
      }
    };


    export const updateCashExpenses  = async (body, id) => {
      try {
        const userReq = {
          ...body, // Spread the properties of 'body'
          updatedBy: [
            ...(body.updatedBy || []), // Ensure 'updatedBy' is an array
            {
              name: `Anvesh Babu`,
              userId: "guest",
              date: new Date().toISOString(),
            },
          ],
        };
        delete userReq.id;
        const docRef = await updateDoc(
          doc(getFirestore(), DB_NAME.CASH_EXPENSES, id),
          userReq
        );
        Toast({ message: "Cash expenses Updated successfully" });
        console.log(docRef);
        return docRef;
      } catch (e) {
        console.error("Error fetching Batch:", e);
        let message = e?.message || "Something went wrong";
        Toast({ message, type: "error" });
        throw e; // Propagate error to be handled by the caller
      }
    };

    export const deleteCashExpenses = async (body) => {
      try {
        const docRef = await deleteDoc(
          doc(getFirestore(), DB_NAME?.CASH_EXPENSES, body)
        );
    
        console.log("docRef--", docRef);
    
        Toast({ message: "Batch successfully Deleted" });
        return docRef;
      } catch (e) {
        // eslint-disable-next-line no-undef
        const message = error?.message || "Something went wrong";
        Toast({ message, type: "error" });
        throw e;
      }
    };
    