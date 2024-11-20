import React from 'react'
import Registration from '../Component/Registration'
import {getSession} from 'next-auth/react'


const index = () => {
  return (
    <div>
      <Registration/>
    </div>
  )
}

export default index


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