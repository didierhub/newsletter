import React, { ReactNode } from 'react';

interface SubscribeProps {
  children: ReactNode;
}

const SubscriptionContenair : React.FC<SubscribeProps> = ({ children }) => {
    return <div  className=' w-[350px] h-[250px]   border-2  shadow-lg  rounded-lg absolute   translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]   '>{children}</div>;
  };

export default SubscriptionContenair