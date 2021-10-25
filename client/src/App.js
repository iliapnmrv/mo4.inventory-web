import { Fragment } from 'react';
import './App.css';
import Form from './components/Form/Form';
import Header from './components/Header/Header';


function App() {
  return (
    <Fragment>
      <div className="container">
        <Header />
        <Form />
      </div>
    </Fragment>
  );
}

export default App;
