import { styled } from '@linaria/react';

const Badge = styled.div<{color: string}>`
  display: block;
  height: 20px;
  width: 20px;
  background-color: ${(props) => props.color};
  border-radius: 5px; 
  margin: auto;
`;

export default Badge;
