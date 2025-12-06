import React, { use } from 'react';
import { AuthContext } from '../context and provider/Context';

const UseAuth = () => {
 const authInfo = use(AuthContext)
  return authInfo;
};

export default UseAuth;