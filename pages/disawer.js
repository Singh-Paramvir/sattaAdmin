import React from 'react'
import Disawer from '../Component/Disawer'
import {getSession} from 'next-auth/react'


const disawer = () => {
  return (
    <div>
        <Disawer/>
    </div>
  )
}

export default disawer;

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