import React from 'react'
import { useState } from 'react'
import Header from './Header'
import InfoPanel from './InfoPanel'
import Stats from './Stats'
import Form from './Form'

export default function Main () {
  return (
    <>
      <Header className=""  />
      <Stats className="" />
     <div className="flex flex-col md:flex-row mt-12 gap-6">
  <InfoPanel />
  <Form />
</div>

    </>
  )
}
