import React from 'react';
import Amplify from 'aws-amplify'
import config from '../aws-exports'
import AppRouter from './router.js'
Amplify.configure(config)

export default function App() {
  return (
    <>
      <AppRouter/>
    </>
  );
}