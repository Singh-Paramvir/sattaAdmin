import React from 'react'

import {getSession} from 'next-auth/react'
import Dashboard from '../Component/Dashboard'
import Head from 'next/head'
// import SideBar from '../Component/SideBar'

const dashboard = (props) => {
  return (
    <div>
      {/* <SideBar/> */}
      <Head>
      <meta property="og:image" content={"%PUBLIC_URL%/logo.png"} />
      <title>Dashboard</title>
      </Head>

    <Dashboard props={props} />
    </div>
  )
}

export default dashboard

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }

  return {
    props:{
      session
    }
  }
}