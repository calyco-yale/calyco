import styled from 'styled-components';
import Color from '../../src/constants/colors';

// Component for rendering larger title texts
const PrimaryText = styled.Text`
  width: 100%;
  color: ${props => (props.color ? props.color : Color.primaryColor)};
  text-align: ${props => (props.align ? props.align : 'center')};
  font-weight: ${props => (props.bold ? 'bold;' : 'normal;')};
  font-size: ${props => (props.size ? props.size : '16px')};
  font-family: Futura;
`;


export default PrimaryText;
