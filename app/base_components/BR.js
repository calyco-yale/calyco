import styled from 'styled-components';

// Component that renders extra space between displayed components
const BR = styled.View`
  height: ${props => (props.size ? props.size : 20)}
`;


export default BR;
