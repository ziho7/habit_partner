import { getCurrentDateAndDayOfWeekInTimeZone, getTimeZone } from "@/lib/get_data";
import React, { createContext, useContext, useEffect, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext({} as any);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: {
    children: React.ReactNode;
}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const timeZone = getTimeZone()

//   useEffect(() => {
//     getCurrentUser()
//       .then((res) => {
//         if (res) {
//           setIsLogged(true);
//           setUser(res);
//         } else {
//           setIsLogged(false);
//           setUser(null);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        timeZone
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;