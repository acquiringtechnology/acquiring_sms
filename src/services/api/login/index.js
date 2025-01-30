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
  where,
} from "firebase/firestore";
import { Toast } from "../../../services/toast";
import { DB_NAME, LOGIN_TYPE,EXIST_LOCAL_STORAGE } from "../../constants";

export const sendLoginOtp = async (body) => {
  try {
    const q = query(
      collection(
        getFirestore(),
        body.loginType === LOGIN_TYPE.EMPLOYEE
          ? DB_NAME.EMPLOYEE
          : DB_NAME.CANDIDATE
      ),
      where("email", "==", body?.email)
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data[0];
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};

export const userSignIn = async (body) => {
  try {
    const q = query(
      collection(
        getFirestore(),
        body.loginType === LOGIN_TYPE.EMPLOYEE
          ? DB_NAME.EMPLOYEE
          : DB_NAME.CANDIDATE
      ),
      where("email", "==", body?.email)
    );

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.size);

    if (querySnapshot.size === 0) {
      Toast({
        message: "No user found. Please enter the correct user details.",
        type: "error",
      });
      return null;
    }

    // Extract the first user data
    const userData = querySnapshot.docs[0].data();
    console.log("User Login Successful", userData);
    // Check if the password matches
    if (userData.password === body.password) {
      // Remove password from the user data
      const { password, ...user } = userData;

      Toast({ message: "User Login Successful", type: "success" });
      localStorage.setItem(
        EXIST_LOCAL_STORAGE.CURRENT_USER,
        JSON.stringify({ ...user, loginType: body.loginType })
      );
      localStorage.setItem(
        EXIST_LOCAL_STORAGE.AUTHTOKEN,
        true
      );
      return user;
    }

    // Incorrect password
    Toast({ message: "Incorrect Password", type: "error" });
    return null;
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};
