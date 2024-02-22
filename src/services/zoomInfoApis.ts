import {  lookingupContacts, lookupNaicCodeRoute } from "../utils/api.routes";
import apis from "./api";


export const looking_naice_code_Api = async() => {
  try {
    const response = await apis.ZoomInfoInstance.get(`${lookupNaicCodeRoute}`);
    return response;
  } catch (error) {
    console.log(error);
    
  }
};


export const contact_search_Api = async (data:any) => {
    try {
        const response = await apis.ZoomInfoInstance.post(`${lookingupContacts}`, JSON.stringify(data));
        return response;
    } catch (error) {
        console.log(error);
        
    }
}