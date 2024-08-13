// userService.js
import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  orderBy,
  getDocs,
  where,
  query,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";

const addUser = async (userData, file) => {
  try {
    let fileUrl = "";

    if (file) {
      const storageRef = ref(storage, `userPictures/${userData.id}`);
      const snapshot = await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, "users"), {
      ...userData,
      pictureUrl: fileUrl,
    });
    alert("successfully added user.");
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Someting is wrong!");
  }
};
const updateUser = async (userId, updatedData, file) => {
  try {
    let fileUrl = updatedData.pictureUrl || ""; // Keep the existing picture URL if not updating

    if (file) {
      // If a new file is provided, upload it to Firebase Storage
      const storageRef = ref(storage, `userPictures/${userId}`);
      const snapshot = await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(snapshot.ref);
    }
    if (!userId) {
      throw new Error("User ID is not provided!");
    }

    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No such user!");
    }

    let userDocRef = null;
    let userData = null;

    querySnapshot.forEach((doc) => {
      userDocRef = doc.ref; // Get the document reference
      userData = doc.data();
    });

    // Update the user document in Firestore

    await updateDoc(userDocRef, {
      ...updatedData,
      pictureUrl: file ? fileUrl : userData.pictureUrl,
    });

    alert("Successfully updated user.");
    console.log("Document updated with ID: ", userId);
  } catch (e) {
    console.error("Error updating document: ", e);
    alert("Something went wrong!");
  }
};

const deleteUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is not provided!");
    }

    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No such user!");
    }

    let userDocRef = null;
    let userData = null;

    querySnapshot.forEach((doc) => {
      userDocRef = doc.ref; // Get the document reference
      userData = doc.data();
    });

    // Check and delete the user's picture from Firebase Storage, if it exists
    if (userData.pictureUrl) {
      try {
        // Extract the path from the pictureUrl
        const storagePath = userData.pictureUrl.split("/o/")[1].split("?")[0];
        const storageRef = ref(storage, decodeURIComponent(storagePath));

        console.log("Storage Ref:", storageRef);
        await deleteObject(storageRef);
      } catch (storageError) {
        console.error("Error deleting user picture: ", storageError);
        alert(
          "Error deleting user picture, but proceeding with user deletion."
        );
      }
    } else {
      console.warn("No picture URL found for this user.");
    }
    const querySnapshotMeta = await getDocs(collection(db, "metadata"));
    const meta = [];
    querySnapshotMeta.forEach((doc) => {
      meta.push({ id: doc.id, ...doc.data() });
    });
    const metaDoc = doc(db, "metadata", meta[0].id);
    await setDoc(
      metaDoc,
      { totalAll: Number(meta[0].totalAll) - Number(userData.total) },
      { merge: true }
    );

    // Delete the user document from Firestore
    await deleteDoc(userDocRef);

    console.log("User deleted with ID: ", userId);
    alert("Successfully deleted user.");
  } catch (e) {
    console.error("Error deleting user: ", e);
    alert("Something went wrong!");
  }
};
const updateUserPayroll = async (userId, payrollData) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No such user!");
    }

    let userDocRef = null;
    let userData = null;

    querySnapshot.forEach((doc) => {
      userDocRef = doc.ref; // Get the document reference
      userData = doc.data();
    });

    const userPayroll = userData.payroll || [];
    userPayroll.push(payrollData);

    const totalTaka = Number(userData.total) + Number(payrollData.amount); // Ensure the amount is a number

    await setDoc(
      userDocRef,
      { payroll: userPayroll, total: totalTaka },
      { merge: true }
    );

    const querySnapshotMeta = await getDocs(collection(db, "metadata"));
    const meta = [];
    querySnapshotMeta.forEach((doc) => {
      meta.push({ id: doc.id, ...doc.data() });
    });
    const metaDoc = doc(db, "metadata", meta[0].id);
    await setDoc(
      metaDoc,
      { totalAll: Number(meta[0].totalAll) + Number(payrollData.amount) },
      { merge: true }
    );
    console.log("Payroll updated for user ID: ", userId);
    alert("Successfully updated!");
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const userSnapshot = await getDocs(usersCollection);
  const userList = userSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return userList;
};

const getUserById = async (userId) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No such user!");
    }

    let userData = null;
    querySnapshot.forEach((doc) => {
      userData = { id: doc.id, ...doc.data() };
    });

    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
const createRule = async (rule) => {
  try {
    const docRef = await addDoc(collection(db, "rules"), rule);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const createInvest = async (invest) => {
  try {
    const docRef = await addDoc(collection(db, "invests"), invest);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const createVision = async (vision) => {
  try {
    const docRef = await addDoc(collection(db, "visions"), vision);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const createNotice = async (notice) => {
  try {
    const docRef = await addDoc(collection(db, "notices"), notice);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const createCommittee = async (committee) => {
  try {
    const docRef = await addDoc(collection(db, "committees"), committee);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding committee.", e);
  }
};
const getCommittees = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "committees"));
    const committees = [];
    querySnapshot.forEach((doc) => {
      committees.push({ id: doc.id, ...doc.data() });
    });
    return committees;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};
const getRules = async () => {
  try {
    const q = query(collection(db, "rules"), orderBy("created", "asc")); // Order by 'created' timestamp in ascending order
    const querySnapshot = await getDocs(q);
    const todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });
    console.log(todos.length);
    return todos;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};
const getInvest = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "invests"));
    const rules = [];
    querySnapshot.forEach((doc) => {
      rules.push({ id: doc.id, ...doc.data() });
    });
    return rules;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};
const getVisions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "visions"));
    const visions = [];
    querySnapshot.forEach((doc) => {
      visions.push({ id: doc.id, ...doc.data() });
    });
    return visions;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};
const getNotices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "notices"));
    const notices = [];
    querySnapshot.forEach((doc) => {
      notices.push({ id: doc.id, ...doc.data() });
    });
    return notices;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};
const updateRule = async (id, updatedRule) => {
  try {
    const ruleDoc = doc(db, "rules", id);
    await setDoc(ruleDoc, updatedRule, { merge: true });
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
const updateInvest = async (id, updatedData) => {
  try {
    const investDoc = doc(db, "invests", id);
    await setDoc(investDoc, updatedData, { merge: true });
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
const updateVison = async (id, updatedRule) => {
  try {
    const visionDoc = doc(db, "visions", id);
    await setDoc(visionDoc, updatedRule, { merge: true });
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
const updateNotice = async (id, updatedRule) => {
  try {
    const noticeDoc = doc(db, "notices", id);
    await setDoc(noticeDoc, updatedRule, { merge: true });
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
const deleteRule = async (id) => {
  try {
    await deleteDoc(doc(db, "rules", id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
const deleteInvest = async (id) => {
  try {
    await deleteDoc(doc(db, "invests", id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
const deleteCommittee = async (id) => {
  try {
    await deleteDoc(doc(db, "committees", id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
const deleteVison = async (id) => {
  try {
    await deleteDoc(doc(db, "visions", id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
const deleteNotice = async (id) => {
  try {
    await deleteDoc(doc(db, "notices", id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
const createMetaData = async (id, updatedMeta) => {
  try {
    const metaDoc = doc(db, "metadata", id);
    await setDoc(metaDoc, updatedMeta, { merge: true });
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
const getMetaData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "metadata"));
    const meta = [];
    querySnapshot.forEach((doc) => {
      meta.push({ id: doc.id, ...doc.data() });
    });
    return meta[0];
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const docRef = await addDoc(collection(db, "images"), {
          url: downloadURL,
          name: file.name,
        });
        resolve({ id: docRef.id, url: downloadURL, name: file.name });
      }
    );
  });
};

const deleteImage = async (image) => {
  const storageRef = ref(storage, `images/${image.name}`);
  await deleteObject(storageRef);
  await deleteDoc(doc(db, "images", image.id));
};

const fetchImages = async () => {
  const querySnapshot = await getDocs(collection(db, "images"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
export {
  addUser,
  deleteUser,
  updateUserPayroll,
  getUsers,
  getUserById,
  createRule,
  getRules,
  updateRule,
  deleteRule,
  createNotice,
  createVision,
  deleteNotice,
  deleteVison,
  updateNotice,
  updateVison,
  getNotices,
  getVisions,
  createMetaData,
  getMetaData,
  uploadImage,
  deleteImage,
  fetchImages,
  updateUser,
  deleteInvest,
  updateInvest,
  createInvest,
  getInvest,
  createCommittee,
  getCommittees,
  deleteCommittee,
};
