import React from 'react'
import TeamCount from '../Component/TeamCount'
import {getSession} from 'next-auth/react'


const teamCount = () => {
  return (
    <div>
        <TeamCount/>
    </div>
  )
}

export default teamCount

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