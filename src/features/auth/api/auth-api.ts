import {api} from "@/shared/lib/api-client";
export type UserProfile={id:string;username?:string;email:string;firstName?:string;lastName?:string;storeName?:string;tier?:string;isAdmin?:boolean};
const normalize=(u:Record<string,unknown>):UserProfile=>({id:String(u.id||""),username:String(u.username||""),email:String(u.email||""),firstName:String(u.firstName||""),lastName:String(u.lastName||""),storeName:String(u.storeName||""),tier:u.tier?String(u.tier):u.isAdmin?"PRO":"FREE",isAdmin:Boolean(u.isAdmin)});
export async function login(identifier:string,password:string){const {data}=await api.post("/api/auth/login",{identifier,password});const u=data.user||data.data?.user;if(!data.success||!u)throw new Error(data.error||"Email/username atau password salah.");return normalize(u);}
export async function register(payload:{firstName:string;lastName:string;storeName:string;email:string;password:string}){const {data}=await api.post("/api/auth/register",payload);const u=data.user||data.data?.user;if(!data.success||!u)throw new Error(data.error||"Pendaftaran tidak berhasil.");return normalize(u);}
export async function getCurrentUser(){const {data}=await api.get("/api/auth/me");return data.user?normalize(data.user):null;}
export async function logout(){await api.post("/api/auth/logout");}
export async function getUserData(){const {data}=await api.get("/api/user/data");return data.data||{};}
export async function saveUserData(payload:{calcSettings:unknown;historyLog:unknown[];menuItems:unknown[]}){await api.put("/api/user/data",{data:payload});}