import React from 'react';
import renderer from 'react-test-renderer';
// import User from '../app/components/User';
import LoginComponent from '../app/components/Login';

// import PrimaryText from '../app/base_components/PrimaryText';
// import styled from 'styled-components'
// import 'jest-styled-components';

// // Testing Rendering of User Component
// test('renders correctly', () => {
//     const tree = renderer.create(<LoginComponent />).toJSON();
//     expect(tree).toMatchSnapshot();
// });

// I think you need to first mock the modules that PrimaryText is dependent on
// jest.mock('../src/constants/colors');

jest.mock(
    'react-native-router-flux', () => ({
        Actions: {
        signUpScreen: jest.fn()
        // whatever other Actions you use in your code
        },
    })
)

jest.mock(
    'styled-components', () => ({
        styled:  {
            default: jest.fn()
        },
    })
);


// And then run the Jest test that renders a PrimaryText component and uses
// snapshot testing (look this up) to check that everything renders properly
// test('renders correctly', () => {
//     const tree = renderer.create(<PrimaryText>message</PrimaryText>).toJSON();
//     expect(tree).toMatchSnapshot();
// });

// Here's a random test that you can run npm run test on to see that Jest works
// describe('Addition', () => {
//     it('knows that 2 and 2 make 4', () => {
//       expect(2 + 2).toBe(4);
//     });
//   });