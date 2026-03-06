import React from 'react'
import Header from './Header'
import InfoPanel from './InfoPanel'
import Stats from './Stats'
import Form from './Form'

export default function Main() {
  return (
    <div className="w-full overflow-x-hidden">
      
      {/* Header */}
      <Header />

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Stats />
      </div>

      {/* Info + Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10">
          
          {/* Left Panel */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <InfoPanel />
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Form />
          </div>

        </div>
      </div>

    </div>
  )
}