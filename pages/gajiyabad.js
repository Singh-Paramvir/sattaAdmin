import React from 'react'
import Gajiyabad from '../Component/Gajiyabad'
import {getSession} from 'next-auth/react'


const gajiyabad = () => {
  return (
    <div>
        <Gajiyabad/>
    </div>
  )
}

export default gajiyabad;

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