import React from 'react'
import ChangePassword from '../Component/ChangePassword'
import {getSession} from 'next-auth/react'

const changePassword = () => {
  return (
    <div>
        <ChangePassword/>
    </div>
  )
}

export default changePassword

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
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