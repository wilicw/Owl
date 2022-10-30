import { styled } from '@linaria/react';

const Text = styled.p<{
  block?: boolean,
  align?: string
}>`
  margin: 4px;
  font-weight: 600;
  font-size: 1.05em;
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  text-align: ${(props) => props.align || 'left'}
`;

export default Text;
