import React from 'react'
import { useSelector } from 'react-redux'
import { getSelf } from '../store/slices/selfHandler.slice'

function MyProfile() {
    const user = useSelector(getSelf)
    const question = [
        {ques : "What happens when I update my email address (or mobile number)?" , ans : "Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number)."},
        {ques : "When will my Shopify account be updated with the new email address (or mobile number)?" , ans : "It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes."},
        {ques : "What happens to my existing Shopify account when I update my email address (or mobile number)?" , ans : "Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details."},
        {ques : "Does my Seller account get affected when I update my email address?" , ans : "Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also."},
        
    ]
  return (
    <div className="flex items-center justify-center  mx-[20px] white">
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-xl font-bold text-gray-800">
          <div className="w-6 h-6 mr-2 bg-blue-500 rounded-full"></div>
          My Profile
        </div>
        {/*<div className="flex items-center">
          <button className="mr-4 text-gray-700">Find people</button>
          <button className="mr-4 text-gray-700">Messages</button>
          <button className="text-gray-700">My Contacts</button>
          <img
            src={user.avatar.url}
            alt="Profile"
            className="w-8 h-8 ml-4 rounded-full"
          />
        </div> */}
      </div>

      {/* Profile */}
      <div className="flex gap-6">
        <img
          src={user?.avatar?.url}
          alt="Profile"
          className="object-cover rounded-lg w-36 h-36"
        />
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{user?.firstname + " " + user?.lastname}</h1>
          <p className="text-blue-500">Product Designer</p>
          <div className="flex items-center mt-2 text-gray-700">
            <span className="text-lg font-semibold">5.6</span>
            <span className="ml-2 text-blue-500">★★★★★</span>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 mr-2 text-white bg-blue-500 rounded">
              Send Message
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded">Contacts</button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="pt-6 mt-6 border-t">
        <h2 className="mb-2 font-semibold text-gray-800">About</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          {/* Contact Information */}
          <div>
            <h3 className="font-medium">Contact Information</h3>
            <p>Phone: <span className="text-blue-500">+1 123 456 7890</span></p>
            <p>Address: 525 E 68th Street, New York, NY</p>
            <p>
              Email:{" "}
              <a href="mailto:hello@jeremyrose.com" className="text-blue-500">
                {user?.email}
              </a>
            </p>
            <p>
              Site:{" "}
              <a href="http://www.jeremyrose.com" className="text-blue-500">
                www.jeremyrose.com
              </a>
            </p>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="font-medium">Basic Information</h3>
            <p>Birthday: June 5, 1992</p>
            <p>Gender: Male</p>
          </div>
        </div>
      </div>

      {/* Work */}
      <div className="pt-6 mt-6 border-t">
        <h2 className="mb-2 font-semibold text-gray-800">Work</h2>
        <div className="text-gray-700">
          <p className="font-medium">
            Spotify New York <span className="ml-2 text-blue-500">Primary</span>
          </p>
          <p>170 William Street, NY 10038-78 212-312-51</p>

          <p className="mt-2 font-medium">
            Metropolitan Museum{" "}
            <span className="ml-2 text-blue-500">Secondary</span>
          </p>
          <p>525 E 68th Street, NY 10561-78 156-187-60</p>
        </div>
      </div>
      {/* FAQ */}
      <div id="faq" className='pt-6 mt-6 border-t'>
            <h1 className='text-[24px] font-[600] relative'>FAQ <span className='absolute top-[5%]  text-[24px] font-[600] text-blue-500'>s</span></h1>
            <div id="details">
            {
                question.map(({ques , ans}) => {
                    return (<div key={ques} className='mt-4'>
                        <h1 className='text-[16px] text-[#000000b7] font-[600]' >What happens when I update my email address (or mobile number)?</h1>
                        <p  className='text-[15px] font-[500] text-[#00000084] my-[15px]'>{ans}</p>
                        </div>)
                })
            }
                
            </div>

            <h1 className='text-[16px] font-[500] text-[red] relative mt-[20px] hover:cursor-pointer'>Delete Account </h1>
      </div>
    </div>
  </div>
  )
}

export default MyProfile
