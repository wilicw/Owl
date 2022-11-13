import { styled } from '@linaria/react';

const Clock = styled.p<{
  color: string
}>`
  color: ${(props) => props.color};
  text-align: center;
  display: block;
  font-family: monospace;
  font-weight: 800;
  font-size: 3.5em;
  margin: 0;
`;

export default Clock;
