
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  where
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Data States
  const [bloodStock, setBloodStock] = useState([]);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    donorsRegistered: 0,
    bloodUnits: 0,
    livesImpacted: 0
  });

  // Fetch initial data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get extra user details from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser({ ...user, ...userDoc.data() });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    fetchBloodStock();
    fetchRequests();

    return unsubscribe;
  }, []);

  const fetchBloodStock = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "bloodInventory"));
      const stock = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBloodStock(stock);
      // Update stats based on stock
      const totalUnits = stock.reduce((acc, item) => acc + (item.count || 0), 0);
      setStats(prev => ({ ...prev, bloodUnits: totalUnits }));
    } catch (error) {
      console.error("Error fetching blood stock:", error);
      // Fallback for demo if no DB connection
      setBloodStock([
        { id: 1, type: 'A+', count: 12, lastUpdated: 'Today, 10:30 AM', location: 'City Hospital' },
        { id: 2, type: 'O+', count: 8, lastUpdated: 'Today, 09:15 AM', location: 'Central Bank' }
      ]);
    }
  };

  const fetchRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "requests"));
      setRequests(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Check if new user and add to db if needed, or just rely on onAuthStateChanged
      // For now, onAuthStateChanged handles the state, so just return
      return true;
    } catch (error) {
      console.error("Google Login Error:", error);
      alert(error.message);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const registerDonor = async (donorData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, donorData.email, donorData.password);
      // Save extra details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: donorData.fullName,
        role: 'donor',
        bloodGroup: donorData.bloodGroup,
        location: donorData.city,
        mobile: donorData.mobile,
        age: donorData.age
      });
      // Update local state is handled by onAuthStateChanged
      setStats(prev => ({ ...prev, donorsRegistered: prev.donorsRegistered + 1 }));
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration failed: " + error.message);
    }
  };

  const requestBlood = async (requestData) => {
    try {
      await addDoc(collection(db, "requests"), {
        ...requestData,
        status: 'Pending',
        createdAt: new Date().toISOString()
      });
      alert('Request Submitted Successfully!');
      fetchRequests(); // Refresh
    } catch (error) {
      console.error("Request Error:", error);
      alert("Failed to submit request.");
    }
  };

  const updateStock = async (id, newCount) => {
    // Implement Firestore update
    // Just a placeholder for now
    console.log("Updating stock", id, newCount);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      bloodStock,
      donors: [], // Donors usually private
      requests,
      stats,
      login,
      googleLogin,
      logout,
      registerDonor,
      requestBlood,
      updateStock,
      loading
    }}>
      {!loading && children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
