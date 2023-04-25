import {createContext, useContext, useState } from 'react';
//useContext is basically to avoid props drilling and makes the context state available wherever inside the proivider 
//Context has two parts: provider and consumer. Provider provides the info and the layer where info gets stored set and created and its always outside of the consumer of context. the consumer consumes the data in the context provider. two ways to access the info: use context.consumer or useContext hook. Context will store and create the user. 
//5-10 creates the base of the context
const UserContext = createContext({

    user: {},
 setUser: () => {},
 
   
   });
   //11-20 when you connect it is saying what the state will be. after we create out context we create a new state that will essentially be the provider 
export default function UserContextProvider ({children}) {
    const [user, setUser] = useState({activities: []})
    return (

        <UserContext.Provider value={{user, setUser }}>
            {children}
            {/* app is the children  */}
        </UserContext.Provider>
    
      );
}
//below creates a custom hook that allows us to import the user context throughout the app without having to call usercontext everytime 
export const useUserContext = () => {

    return useContext(UserContext);
  
  };