import React , {useState, useEffect, useContext} from "react"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage =  ()=>{
const [form , setForm] = useState({email:'', password: ''});

const {loading, request , error , clearError} = useHttp();
const message = useMessage();

const auth = useContext(AuthContext);

useEffect(()=>{
    message(error)
    clearError();
}, [error, message , clearError]);
useEffect(()=>{
    window.M.updateTextFields() ; // this is method of material  -for active input
}, [])
const changeHandler = (event)=>{
//setForm({...form ,[event.target.name]:[event.target.value]} )  // check here!!! data maybe is wrong
setForm({...form ,[event.target.name]:event.target.value} )  // check here!!! data maybe is wrong

}

const registerHandler = async ()=>{
try {
    const data = await request("/api/auth/register" , "POST" , {...form});
    message(data.message);

}catch (e) {
    
    }
}
const loginHandler = async ()=>{
    try {
        const data = await request("/api/auth/login" , "POST" , {...form});
      //  message(data.message);
        auth.login(data.token , data.userId);
    }catch (e) {

      }
    }
    

return (
    <div className='row'>
        <div className="col s6 offset-s3">
            <h1>Сократи ссылку</h1>
            <div className="card blue darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Авторизация</span>
                    <div>
                        <div className="input-field">
                            <input onChange={changeHandler}
                                   className='yellow-input'
                                   name='email'
                                   placeholder="Введите адрес электронной почты"
                                   id="email"
                                   type="email" />
                                   value={form.email}
                                <label htmlFor="first_name">Email</label>
                        </div>
                        <div className="input-field">
                            <input onChange={changeHandler}
                                   className='yellow-input'
                                   name='password'
                                   placeholder="Введите пароль"
                                   id="password"
                                   value={form.password}
                                   type="password" />
                                <label htmlFor="password">First Name</label>
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <button
                        onClick={loginHandler}
                        style={{marginRight: 10}}
                        disabled={loading}
                        className='btn yellow darken-4 '>
                        Войти
                    </button>
                    <button
                        disabled={loading}
                        onClick={registerHandler}
                        className='btn grey lighten-1 black-text '>
                        Регистрация
                    </button>
                </div>
            </div>
        </div>
    </div>
)

}