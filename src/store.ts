import {PayloadAction, configureStore, createSlice} from '@reduxjs/toolkit';

interface userStateValue{
    username: string;
    contact : string;
}

interface userState{
value:userStateValue;
}

const initialState = {value: {username: "",contact: "",}} as userState;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        login:(state: userState,action: PayloadAction<{username:string}>)=>{
            state.value.username= action.payload.username;
        },
        logout:(state:userState)=>{
            state.value.username = "";
        },
        addContact:(state:userState,action :PayloadAction<{contact:string}>)=>{
            state.value.contact=action.payload.contact;
        },
        removeContact:(state:userState)=>{
            state.value.contact = "";
        }
    },
}
);


export const {login,logout,addContact,removeContact} = userSlice.actions;

export const store = configureStore({
    reducer:{
        user: userSlice.reducer,
    }
});
