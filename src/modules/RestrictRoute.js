import React, { Component, FC } from 'react';

interface Props {
  path: string | string[];
  component: FC;
  fallBack: FC;
  exact?: boolean;
  authId: number;
}

// export const RestrictRoute = ({
//   component: Component,
//   fallBack: Fallback,
//   auth } : Props) => {
//  const user = useUser();
//  return auth(user) ? <Component/> : <Fallback/>
// };
//
