import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        username:"",
        name:"",
        code:"",
        image:""
       
    },
    reducers:{
        login:(state , action)=>{
            state.username=action.payload.username;
            state.name=action.payload.name;
            state.code=action.payload.code;
            state.image=action.payload.image;
            


        },
        logout:(state)=>{
            state.username="";
            state.name="";
            state.code="";
            state.image="";

           
            localStorage.removeItem("token");
            window.location.replace("/login.html");
            
        },
       
        
    }
})


const myVarSlice=createSlice({
    name:"myVar",
    initialState:{
        showStoryId: 0 
      

    },
    reducers:{
        chengMyStory:(state, action)=>{
            state.showStoryId = action.payload.id;
          
        }
    }

})

export const {login ,logout ,addSefaresh  }=userSlice.actions;
export const {chengMyStory }=myVarSlice.actions;
export const store=configureStore({
    reducer:{user: userSlice.reducer , myVar:myVarSlice.reducer}
}) 