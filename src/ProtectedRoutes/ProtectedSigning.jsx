// import React from "react";
// import { Navigate } from "react-router-dom";

// export default function ProtectedSigning({ childern }) {
//   return (
//     <div>
//       {!localStorage.getItem("token") ? (
//         childern
//        ): (
//        <Navigate to={"/home"}  />
//     )}
//     </div>
//   );
// }

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/TokenContext";

export default function ProtectedSigning({ children }) {
      let {token} = useContext(AuthContext)
    
  return (
    <>{!token ? children : <Navigate to={"/"} />}</>
  );
}
