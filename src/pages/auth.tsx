import React from 'react';

import { AuthForm } from '../components/AuthForm';

const Auth = () => {
    return (
      <main className="main">
        <AuthForm />
        <style jsx>{`
            .main{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100vw;
                height: 100vh;
            }
            `}</style>
      </main>
    );
  };
  
  export default Auth;