import React from 'react'
import Fa from '../Component/2Fa'
import {getSession} from 'next-auth/react'


const wallet = () => {
  return (
    <div>
        <Fa/>
    </div>
  )
}

export default wallet

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