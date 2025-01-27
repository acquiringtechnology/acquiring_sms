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
  where
} from "firebase/firestore";
import { Toast } from "../../../services/toast";
import { DB_NAME } from "../../constants";

export const getBatchRecordingListById = async (batchId) => {
  try {
    const q = query(
      collection(getFirestore(), DB_NAME.BATCH_RECORDING_CLASSES),
      where("batchId", "==", batchId)
    );
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};

export const createBatchRecording = async (body) => {
  try {
    const userReq = {
      ...body,
      createdBy: {
        name: `Anvesh Babu`,
        user_id: "guest",
        date: serverTimestamp(),
      },
    };
    const docRef = await addDoc(
      collection(getFirestore(), DB_NAME?.BATCH_RECORDING_CLASSES),
      userReq
    );
    Toast({ message: "Batch Recording Add successfully" });
    return { id: docRef.id, ...userReq };
  } catch (e) {
    console.error("Error fetching Batch:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};
