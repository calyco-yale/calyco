export const NewsFeedTab = (props) => {
  let textColor = props.focused ? '#333333' : '#999999'
  const newsFeedIconFocused = require("../../assets/home-variant.png")
  const newsFeedIconUnfocused = require("../../assets/home-variant-outline.png")
  let newsFeedIcon = props.focused ? newsFeedIconFocused : newsFeedIconUnfocused
  let borderColor = props.focused ? '#333333' : '#FFFFFF'
  return (
  <View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:4, padding:20}}>
  <Image source ={newsFeedIcon} style={{width: 20, height: 20}} />
  <Text style={{color: textColor}}>News Feed</Text>
  </View>
  );
}

export const SearchTab = (props) => {
  let textColor = props.focused ? '#333333' : '#999999'
  const searchIconFocused = require("../../assets/account-search.png")
  const searchIconUnfocused = require("../../assets/account-search-outline.png")
  let searchIcon = props.focused ? searchIconFocused : searchIconUnfocused
  let borderColor = props.focused ? '#333333' : '#FFFFFF'
  return (
  <View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:4, padding:20}}>
  <Image source ={searchIcon} style={{width: 20, height: 20}} />
  <Text style={{color: textColor}}>Search</Text>
  </View>
  );
}

export const ProfileTab = (props) => {
  let textColor = props.focused ? '#333333' : '#999999'
  const profileIconFocused = require("../../assets/account-circle.png")
  const profileIconUnfocused = require("../../assets/account-circle-outline.png")
  let profileIcon = props.focused ? profileIconFocused : profileIconUnfocused
  let borderColor = props.focused ? '#333333' : '#FFFFFF'
  return (
  <View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:4, padding:20}}>
  <Image source ={profileIcon} style={{width: 20, height: 20}} />
  <Text style={{color: textColor}}>Profile</Text>
  </View>
  );
}