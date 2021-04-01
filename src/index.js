import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Client from 'aws-appsync'
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'
import AppSync from './AppSync'

const client = new Client({
  url: AppSync.aws_appsync_graphqlEndpoint,
  region: AppSync.aws_appsync_region,
  auth: {
    type: AppSync.aws_appsync_authenticationType,
    apiKey: AppSync.aws_appsync_apiKey
  }
})

console.log(client)

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
)

ReactDOM.render(<WithProvider />, document.getElementById('root'));
registerServiceWorker();
