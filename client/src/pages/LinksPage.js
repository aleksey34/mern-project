import React, {useCallback, useContext, useState , useEffect} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkList} from "../components/LinkList";



export  const LinksPage = ()=>{
const [links , setLinks] = useState([]);
const {loading , request} = useHttp();
const {token} = useContext(AuthContext);
const fetchLinks = useCallback( async ()=>{
    try{
const feched = await  request('/api/link' , 'GET' , null , {
    Authorization: `Bearer ${token}`
})

setLinks(feched);
    }catch (e) {

    }
} , [token , request]);

useEffect(()=>{
    fetchLinks();
} , [fetchLinks])

    if(loading){
        return <Loader/>
    }

    return (
        <>
            {!loading && <LinkList  links={links}/> }
        </>
    )
}