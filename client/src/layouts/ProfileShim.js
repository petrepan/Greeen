import React from 'react'

const ProfileShim = () => {
    return (
      <div className="border bg-green-200 border-gray-300 my-4 shadow rounded-md my-1 p-4 max-w-4xl w-full mx-auto">
        <div className="animate-pulse flex flex-col items-center justify-center space-x-4">
          <div className="rounded-full bg-gray-500 h-24 w-24"></div>
          <div className="py-1 flex flex-col items-center justify-center w-full my-3">
            <div className="h-4 bg-gray-500 rounded w-5/6"></div>
            <div className="space-y-2 w-full flex flex-col items-center justify-center my-5">
              <div className="h-4 bg-gray-500 rounded w-3/4"></div>
              <div className="h-4 bg-gray-500 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProfileShim;