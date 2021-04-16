import * as React from 'react';
import { View, useWindowDimensions, Text, ScrollView, Button } from 'react-native';
import BoxSimple from '../components/EventBox'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import NewsFeedComponent from '../components/NewsFeed';
import { Calendar } from "react-native-calendars";

const FirstRoute = () => (
  <>
  <Button
  title="Add Event"
  color="#841584"
  />
  <Calendar
    // Collection of dates that have to be marked. Default = {}
    markedDates={{
      "2021-03-28": { selected: true, marked: true, selectedColor: "blue" },
      "2021-03-17": { marked: true, dotColor: "red", activeOpacity: 0 },
      "2021-03-22": { disabled: true, disableTouchEvent: true }
    }}
    onDayPress={(day) => {alert(`Event on this day:${day.dateString}`);
  }}
    
  />
  </>
);

const SecondRoute = () => (
  <>
  <ScrollView style={{ flex: 2, backgroundColor: '#ffffff' }}>
    <BoxSimple style= {{backgroundColor: '#ffffff'}}>
      <NewsFeedComponent></NewsFeedComponent>
    </BoxSimple>
    <BoxSimple style= {{backgroundColor: '#ffffff'}}>
      <NewsFeedComponent></NewsFeedComponent>
    </BoxSimple>
  </ScrollView>
  </>
);

export default function ProfilePage() {
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