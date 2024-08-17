import React from 'react'
import DirectIncome from '../Component/DirectIncome'
import Faridabaad from '../Component/faridabaad'
import {getSession} from 'next-auth/react'


const faridabaad = () => {
  return (
    <div>
        <Faridabaad/>
    </div>
  )
}

export default faridabaad;

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