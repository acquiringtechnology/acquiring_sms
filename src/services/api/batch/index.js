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


  export const getAllBatchList = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(getFirestore(), DB_NAME.BATCH)
      );
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        value:doc.id,
        label:doc.data().batchCode,
      }));
      return data;
    } catch (e) {
      console.error("Error fetching leads:", e);
      let message = e?.message || "Something went wrong";
      Toast({ message, type: "error" });
      throw e; // Propagate error to be handled by the caller
    }
  };

  export const getBatchById = async (docId) => {
    try {
      const docRef = doc(getFirestore(), DB_NAME.BATCH, docId);
      const docSnap = await getDoc(docRef); // Fetch document
      console.log('docSnap.data()--',docSnap.data())
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      
      }
      
    } catch (e) {
      console.error("Error fetching batch:", e);
      let message = e?.message || "Something went wrong";
      Toast({ message, type: "error" });
      throw e; // Propagate error to be handled by the caller
    }
  };


  async function getLatestBatch() {
    try {
      const db = getFirestore();
      const batchRef = collection(db, DB_NAME?.BATCH);

      const q = query(batchRef, orderBy("createdBy.date", "desc"), limit(1));
  
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // The first document (the most recent one)
        console.log('querySnapshot.docs[0]---',querySnapshot.docs[0].data())
        const latestBatch = querySnapshot.docs[0].data();
        const lastCode = latestBatch.batchCode; // Assuming batch code is the document ID
  
        // Extract the numeric part of the code
        const lastCodeNumber = parseInt(lastCode.replace("ATEFSWD", "")) || 1000; // Default to 100 if parsing fails
  
        // Generate the new batchCode code
        const newCodeNumber = lastCodeNumber + 1;
        const newBatchCode = "ATE" + newCodeNumber.toString().padStart(7, "0");
  
        console.log("New batchCode Code:", newBatchCode);
        return newBatchCode;
      } else {
        // If no batch found, start from ATEFSWD1001
        return "ATEFSWD1001";
      }
    } catch (e) {
      console.error("Error fetching batch:", e);
      const message = e?.message || "Something went wrong";
      Toast({ message, type: "error" });
      throw e; // Propagate error to be handled by the caller
    }
  }


  export const createBatch = async (body) => {
    try {
      const userReq = {
        ...body,
        batchCode:await getLatestBatch(),
        createdBy: {
          name: `Anvesh Babu`,
          user_id: "guest",
          date: serverTimestamp(),
        },
      };
      console.log('userReq----',userReq)
      const docRef = await addDoc(
        collection(getFirestore(), DB_NAME?.BATCH),
        userReq
      );
      Toast({ message: "Batch Add successfully" });
      return{id: docRef.id,...userReq}
    } catch (e) {
      console.error("Error fetching Batch:", e);
      let message = e?.message || "Something went wrong";
      Toast({ message, type: "error" });
      throw e; // Propagate error to be handled by the caller
    }
  };


  export const updateBatch = async (body, id) => {
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
        doc(getFirestore(), DB_NAME.BATCH, id),
        userReq
      );
      Toast({ message: "Batch Updated successfully" });
      console.log(docRef);
      return docRef;
    } catch (e) {
      console.error("Error fetching Batch:", e);
      let message = e?.message || "Something went wrong";
      Toast({ message, type: "error" });
      throw e; // Propagate error to be handled by the caller
    }
  };


  export const deleteBatch = async (body) => {
    try {
      const docRef = await deleteDoc(
        doc(getFirestore(), DB_NAME?.BATCH, body)
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
  
  