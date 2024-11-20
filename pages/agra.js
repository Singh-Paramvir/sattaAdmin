import React from 'react'
import Agra from '../Component/Agra'
import {getSession} from 'next-auth/react'


const agra = () => {
  return (
    <div>
        <Agra/>
    </div>
  )
}

export default agra;

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