import React, { useEffect, useState } from 'react';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, {Analytics, AWSKinesisProvider, Auth} from 'aws-amplify';
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
        flushInterval: 1000, // 5s

        // OPTIONAL - The limit for failed recording retries.
        resendLimit: 5
    } 
});
Analytics.addPluggable(new AWSKinesisProvider());

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    Auth.currentUserInfo().then((currentUserInfo) => {
      setCurrentUser(currentUserInfo);
      console.log(currentUserInfo);
    })
  }, []);
  
    return (
      <div className="App">
        <div className="container mt-2">
          {currentUser && <BookingForm userName={currentUser.username}/>}
        </div>
      </div>
    );
}

export default withAuthenticator(App, true);
