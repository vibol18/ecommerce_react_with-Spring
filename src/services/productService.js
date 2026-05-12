import api from "../api/axios";
export const getProducts = async()=>{
    return await api.get("./products");
}