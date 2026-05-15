import api from "../api/axios";
export const getBanners = async()=>{
    return await api.get("/api/banners");
}