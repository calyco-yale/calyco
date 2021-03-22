# CALYCO


## Steps to get app running:

- npm install
- expo start
- To run iOS Simulator, download Xcode (https://docs.expo.io/workflow/ios-simulator/)

<br>

## Backend Notes:


### Steps to sync API queries with frontend:

**Add import statements**

import { API, graphqlOperation } from ‘aws-amplify’;

import { ${query_name} } from ‘./src/graphql/queries’;

**Fetch data**

const data = await API.graphql(graphqlOperation(${query_name}, { ${provide any necessary parameters here} }))

**Set variable using fetched data**

import React, {useEffect, useState} from 'react';

const [${var}, ${method_name}] = useState(null)

${method_name}(data.data.#{name_of_fetched_object})

**We can now use ${var} to display data fetched**

<br>

## Packages installed:

npm i -g graphql-default-value-transformer (https://github.com/trek10inc/graphql-default-value-transformer)