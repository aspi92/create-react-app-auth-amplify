import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, {Analytics, AWSKinesisProvider} from 'aws-amplify';
import aws_exports from './aws-exports';
import { BookingForm } from './BookingForm.jsx';

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
        <div class="container mt-2">
          <BookingForm />
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
