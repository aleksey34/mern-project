import {useState , useCallback, useEffect} from 'react';

const storageName = 'userData'

export  const useAuth = ()=>{
const [token , setToken]  = useState(null);
const [userId , setUserId] = useState(null);
const [ready , setReady] = useState(false);


const login = useCallback((jwtToken, id)=>{
    setToken(jwtToken);
    setUserId(id);
    window.localStorage.setItem(storageName , JSON.stringify({token:jwtToken, userId:id}));
}, []);


const logout = useCallback(()=>{
    setUserId(null);
    setToken(null);
    window.localStorage.removeItem(storageName);


}, []);

    useEffect( ()=>{
        const data = JSON.parse(window.localStorage.getItem(storageName));
        if(data && data.token){

            login(data.token , data.userId);
        }
     setReady(true);

    } , [login])

return {login , logout , token , userId , ready};
}