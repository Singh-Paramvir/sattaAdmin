import React from 'react'
import Login from '../Component/Login'
// import {getSession} from 'next-auth/react'
import UserHis from "../Component/UserHis"

const login = () => {
  return (
    <div>
      
        <UserHis/>
    </div>
  )
}

export default login

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (session) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props:{
//       session
//     }
//   }
// }



