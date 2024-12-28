import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Toast } from "../../../services/toast";
// Toast({ type: 'success', message: 'user created successfully', title: 'Error' })
export const getAllLeads = async () => {
  try {
    const querySnapshot = await getDocs(collection(getFirestore(), "courseEnquiry"));
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
