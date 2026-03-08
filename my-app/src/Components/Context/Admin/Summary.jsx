import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function useAuths() {
  return useContext(AuthContext);
}

function AdminProvider({ children }) {

  const [totalsummary, setsummary] = useState(
    {
      totalCampaigns: 0,
      totalDonationAmount: 0,
      totalUsers: 0
    }
  );

  const datasummary = (data) => {
    setsummary( {
      totalCampaigns: data.totalCampaigns,
      totalDonationAmount: data.totalDonationAmount,
      totalUsers: data.totalUsers
    });
  };

  const value = { datasummary, totalsummary, setsummary };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AdminProvider;