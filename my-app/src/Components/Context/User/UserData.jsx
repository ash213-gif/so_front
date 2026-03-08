// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import  { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

 function AuthProvider({ children }) {
  const navigate=useNavigate();
  const [user, setUser] = useState(null);      // user details
  const [token, setToken] = useState(null);    // auth token
  const [loading, setLoading] = useState(true); // app start pe loading
const [transaction, settransaction] = useState({
  totalAmount: 0,
  totalTimes: 0,
  history: []
});


  useEffect(() => {
    // app refresh hone pe localStorage se data load
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedToken) {
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

 const summary = (summaryData) => {
  settransaction(summaryData || {
    totalAmount: 0,
    totalTimes: 0,
    history: []
  });
};

  const setUserData = (userData) => {
    setUser(userData);
    // optional: user ko localStorage me bhi rakho
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/')
  };
  
  const value = { user,summary , transaction,token,  loading, setUserData, saveToken, logout };

  return (
  <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>)
    
}

export default AuthProvider;