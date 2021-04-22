import React from 'react';
import renderer from 'react-test-renderer';
import PrimaryText from '../app/base_components/PrimaryText';

// I think you need to first mock the modules that PrimaryText is dependent on
jest.mock('styled-components', () => {
    return {};
});
// jest.mock('../src/constants/colors');

// And then run the Jest test that renders a PrimaryText component and uses
// snapshot testing (look this up) to check that everything renders properly
test('renders correctly', () => {
    const tree = renderer.create(<PrimaryText>message</PrimaryText>).toJSON();
    expect(tree).toMatchSnapshot();
});

// Here's a random test that you can run npm run test on to see that Jest works
// describe('Addition', () => {
//     it('knows that 2 and 2 make 4', () => {
//       expect(2 + 2).toBe(4);
//     });
//   });