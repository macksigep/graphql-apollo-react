import React from 'react';

import Header from './Header';
import TodoPrivateWrapper from './Todo/TodoPrivateWrapper';
import TodoPublicWrapper from './Todo/TodoPublicWrapper';
import OnlineUsersWrapper from './OnlineUsers/OnlineUsersWrapper';

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
  
const App = ({auth}) => {


const graphUrl = 'https://hasura.io/graphql';

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: graphUrl,
      headers: {
        Authorization: 'Bearer ${authToken}'
      }
    }),
    cache: new InMemoryCache(),
  });
};

const client = createApolloClient(auth.idToken);

  return ( 
    <ApolloProvider client={client} >
     <div>
      <Header logoutHandler={auth.logout} />
      <div className="container-fluid p-left-right-0">
        <div className="col-xs-12 col-md-9 p-left-right-0">
          <div className="col-xs-12 col-md-6 sliderMenu p-30">
            <TodoPrivateWrapper />
          </div>
          <div className="col-xs-12 col-md-6 sliderMenu p-30 bg-gray border-right">
            <TodoPublicWrapper />
          </div>
        </div>
        <div className="col-xs-12 col-md-3 p-left-right-0">
          <div className="col-xs-12 col-md-12 sliderMenu p-30 bg-gray">
            <OnlineUsersWrapper />
          </div>
        </div>
      </div>
    </div>
    </ApolloProvider> 
  );
};

export default App;