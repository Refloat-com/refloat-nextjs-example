import { useState } from 'react';
import { User } from 'refloat-nextjs-integration/app/types';
import { users } from 'refloat-nextjs-integration/app/mocks/users';
import { plans } from 'refloat-nextjs-integration/app/mocks/plans';

interface UserDropdownProps {
  activeUser: User;
  onUserChange: (userId: string) => void;
}

export default function UserDropdown({ activeUser, onUserChange }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activePlan = plans.find(p => p.id === activeUser.plan);

  return (
    <div className="absolute right-8 top-8 z-10" >
      <h3 className="font-light text-gray-500 mb-4 text-sm text-center italic" >
        You can toggle between users here:
      </h3>
      <div className="relative group" >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full px-2 p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform hover:bg-gray-100 font-medium rounded-md"
        >
          <div className="flex items-center p-3 -mt-2" >
            <img
              className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
              src={activeUser.imgSrc}
              alt={activeUser.name}
            />
            <div className="mx-1" >
              <h1 className="text-md font-semibold text-blue-700" > {activeUser.name} </h1>
              <p className="text-sm text-gray-500 text-center" >
                {activePlan?.name}
              </p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" >
            <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
          </svg>
        </button>

        {
          isOpen && (
            <div className="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 max-h-[200px] overflow-y-scroll w-max px-4 py-2" >
              {
                users.map(user => (
                  <div
                    key={user.id}
                    onClick={() => {
                      onUserChange(user.id);
                      setIsOpen(false);
                    }
                    }
                    className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                      src={user.imgSrc}
                      alt={user.name}
                    />
                    <div className="mx-1" >
                      <h1 className="text-md font-semibold text-gray-700" > {user.name} </h1>
                      <p className="text-sm text-gray-500" >
                        {plans.find(p => p.id === user.plan)?.name}
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
      </div>
    </div>
  );
}
