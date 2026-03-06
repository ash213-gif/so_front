import { useState } from "react";
import { createContext ,useContext  } from "react";
import { useNavigate } from "react-router-dom";

const GetCampaignContext = createContext();

export function useGetCampaign() {
    return useContext(GetCampaignContext);
}

const  GetCampaignProvider =({ children })=> {
    const navigate = useNavigate();

const [ getcampaign,setgetcampaign ]=useState([])

const value = {getcampaign,setgetcampaign}


    return (
        <GetCampaignContext.Provider value={value}>
            {children}
        </GetCampaignContext.Provider>
    )
}

export default GetCampaignProvider;