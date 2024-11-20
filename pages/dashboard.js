


import React from 'react'
import NewDashboard from '../Component/NewDashboard'
import {getSession} from 'next-auth/react'

const newDashboard = () => {
  return (
    <div>

        <NewDashboard/>
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