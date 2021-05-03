# CALYCO (v 1.0.1)

Calyco is a social media platform that consolidates event planning and time scheduling into a React Native app that aims to make the process more managable, simple and intuitive! Let's get started.

## Steps to get app running:

- Clone the repo
- Download the Expo Go app (https://docs.expo.io/)
- Run `npm install` to install dependancies
- Run `expo start` to start the environment
- Run `amplify pull` to get the backend dependencies from AWS
- To run iOS Simulator, download Xcode (https://docs.expo.io/workflow/ios-simulator/)
- Alternatively, if you have an iPhone, you can scan the QR that will permit a simulator run on your device

## How to Use the App

### Account Creation

<img width="316" alt="Screen Shot 2021-05-02 at 9 57 35 PM" src="https://user-images.githubusercontent.com/45299876/116835656-694a0b80-ab91-11eb-96db-260127b13fad.png">

From the landing page, you can either create an account or log in if you already have one! An email authentication service implemented using AWS will send you a verification email.

### News Feed

<img width="310" alt="Screen Shot 2021-05-02 at 10 00 30 PM" src="https://user-images.githubusercontent.com/45299876/116835745-d198ed00-ab91-11eb-96d7-5b211d30b953.png">

When you log in for the first time, your news feed should be empty, but above are some sample events.

<img width="304" alt="Screen Shot 2021-05-02 at 10 03 55 PM" src="https://user-images.githubusercontent.com/45299876/116835863-4bc97180-ab92-11eb-98e3-4684f728969d.png">

If you want to create an event, you can do so by clicking on "Create Event". You can even add as many friends as you want and can even select a type of event to let your friends know how wild your event's going to be :raised_hands: !! Note that to create an event, you need to select a valid time, which would be anytime later than the event creation time. Our app will even suggest available times that work for everyone on the invitation list as well!

### Search

<img width="313" alt="Screen Shot 2021-05-02 at 10 14 41 PM" src="https://user-images.githubusercontent.com/45299876/116836245-cc3ca200-ab93-11eb-859f-6e6e1189c1e9.png">

You can search and add friends using the search bar as well! On their profiles, you can see what events they have in the upcoming weekds, through both a calendar view and a vertical events view. Users also have the functionality to cancel friend requests and even unfriends fellow Cats should there ever need be a reason.

### Profile

<img width="299" alt="Screen Shot 2021-05-02 at 10 15 29 PM" src="https://user-images.githubusercontent.com/45299876/116836279-e8d8da00-ab93-11eb-99b9-14fb29271cc7.png">

Finally, with your own profile, you can view your own upcoming events, as well as past events. Users can customize their cat by changing the color by simply tapping on your profile!
