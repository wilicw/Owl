import { styled } from '@linaria/react';

const Overlay = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 999;
  padding: 30px;
  background-color: #FFF;
  padding: 12;
  border-radius: 5;
  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14);
`;

export default Overlay;
