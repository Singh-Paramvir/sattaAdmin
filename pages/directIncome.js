import React from 'react'
import DirectIncome from '../Component/DirectIncome'
import {getSession} from 'next-auth/react'


const binaryincome = () => {
  return (
    <div>
        <DirectIncome/>
    </div>
  )
}

export default binaryincome;

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