import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, {Analytics, AWSKinesisProvider} from 'aws-amplify';
import aws_exports from './aws-exports';
import { BookingList } from './BookingList.jsx';

Amplify.configure(aws_exports);


Analytics.configure({
    AWSKinesis: {

        // OPTIONAL -  Amazon Kinesis service region
        region: 'eu-central-1',

        // OPTIONAL - The buffer size for events in number of items.
        bufferSize: 1000,

        // OPTIONAL - The number of events to be deleted from the buffer when flushed.
        flushSize: 100,

        // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
        flushInterval: 5000, // 5s

        // OPTIONAL - The limit for failed recording retries.
        resendLimit: 5
    } 
});
Analytics.addPluggable(new AWSKinesisProvider());

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <BookingList />
      </div>
    );
  }
}

export default withAuthenticator(App, true);
