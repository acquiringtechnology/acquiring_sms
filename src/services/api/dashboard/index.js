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
import { DB_NAME } from "../../constants";

export const getleaderBoardCandidate = async (batchId) => {
  try {
    const querySnapshot = await getDocs(
      collection(getFirestore(), DB_NAME.CANDIDATE)
    );

    const data = querySnapshot.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
        overAllMark:
          doc
            .data()
            ?.projects?.reduce(
              (acc, project) => Number(acc) + Number(project.mark),
              0
            ) || 0,
      }))
      .filter((candidate) =>
        candidate.batchIds?.some((batch) => batch.id === batchId)
      )
      .sort((a, b) => b.overAllMark - a.overAllMark); // Sort by overAllMark in descending order

    return data;
  } catch (e) {
    console.error("Error fetching candidates:", e);
    const message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};
