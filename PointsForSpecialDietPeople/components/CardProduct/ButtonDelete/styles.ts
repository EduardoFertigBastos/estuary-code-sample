import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 25px 25px 0 25px;
  height: 40px;
  width: 40px;
  border-radius: 0 25px 0 0;

  background-color: #fc9558;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 20px;
    top: 10px;
  }
`;