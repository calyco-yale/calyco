import { Platform } from 'react-native';
import styled from 'styled-components';

// Component for rendering a text box prompting for user input
const TextInput = styled.TextInput`
  padding: 15px;
  width: 100%;
  min-height: 42px;
  font-size: 18px;
  color: #989898;
  text-align: left;
  border: 0 solid #ddd;
  border-bottom-width: ${Platform.OS === 'ios' ? '1px' : '0px'};
  border-bottom-color: #ddd;
  font-family: Futura;
  `;
export default TextInput;
