import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import BoxSimple from '../components/EventBox'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import NewsFeedComponent from '../components/NewsFeed';

const FirstRoute = () => (
  <>
  {/* Jinny code here */}
  <Text style= {{color:'black', backgroundColor: '#ffffff'}}>hello</Text>
  <View style={{ flex: 2, backgroundColor: '#ffffff' }} />
  </>
);

const SecondRoute = () => (
  <>
  {/* Yunji code here */}
  <BoxSimple style= {{backgroundColor: '#ffffff'}}>
    <NewsFeedComponent></NewsFeedComponent>
  </BoxSimple>
  <View style={{ flex: 2, backgroundColor: '#ffffff' }} />
  </>
);

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Calendar' },
    { key: 'second', title: 'Upcoming Events' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <>
    <View style={{ flex: 0.4, backgroundColor: '#ffffff' }} />
    {/* Brian code here */}
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          renderLabel={({ route, color }) => (
            <Text style={{ color: 'black', margin: 8 }}>
              {route.title}
            </Text>
          )}
          style={{backgroundColor: 'gray'}}
        />
      )}
    />
    </>
  );
}