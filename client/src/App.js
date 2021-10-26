import React, { Fragment } from 'react';
import './App.css';

import Form from './components/Form/Form';
import Header from './components/Header/Header';
import List from './components/List/List';


function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Form />
        <List />
      </div>
    </>
  );
}

export default App;
