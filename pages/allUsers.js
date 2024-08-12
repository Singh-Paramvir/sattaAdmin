


import React from 'react'
import MerchantList from '../Component//allUsers'
import {getSession} from 'next-auth/react'

const newDashboard = () => {
  return (
    <div>

        <MerchantList/>
    </div>
  )
}

export default newDashboard

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
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