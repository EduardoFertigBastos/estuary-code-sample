import styled, { keyframes } from 'styled-components';

import { primaryColor, textColor, titleColor } from '../../styles/variables';

export const PageCreateProduct = styled.div` 
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;
  
  header {
    margin-top: 48px;
  
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: ${primaryColor};
      font-weight: bold;
      text-decoration: none;
    
      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
        color: ${primaryColor};
      }
    }
  }

  form {
    margin: 10px auto;
    padding: 32px 64px;
    max-width: 730px;
    background: #FFF;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    
    h1 {
      font-size: 36px;
    }

    fieldset.field-data {
      margin-top: 64px; 
      min-inline-size: auto;
      border: 0;

      legend.legend-fielddata {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        
        @media screen and (max-width: 600px) {
          display: block;
        }

        h2 {
          font-size: 24px;

          svg {
            vertical-align: top;
          }
        }

        span {
          font-size: 14px;
          font-weight: normal;
          color: ${textColor};
        }
      }
    }

    button {
      width: 260px;
      height: 56px;
      background: ${primaryColor};
      border-radius: 8px;
      color: #FFF;
      font-weight: bold;
      font-size: 15px;
      border: 0;
      align-self: flex-end;
      margin-top: 40px;
      transition: background-color 0.2s;
      cursor: producter;
    }
    
  }
`;
  
export const FieldGroup = styled.div`
  flex: 1;
  display: flex;

  @media screen and (max-width: 800px) {
    display: block;
  }
`;

export const Field = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    flex: 1;
    background: #F0F0F5;
    border-radius: 8px;
    border: 0;
    padding: 16px 24px;
    font-size: 16px;
    color: #6C6C80;
  }
  
  input::placeholder {
    color: #A0A0B2;
  }
  
  label {
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  :disabled {
    cursor: not-allowed;
  }
  
  & + & {
    margin-left: 24px;
  }
  @media screen and (max-width: 800px) {
    & + & {
      margin-left: 0px;
    }
  }
`;

  
export const FieldCheck = styled.div`
  flex-direction: row;
  align-items: center;
  
  input[type=checkbox] {
    background: #F0F0F5;
  }
  
  label {
    margin: 0 0 0 8px;
  }
`;	

export const LeafletContainer = styled.div`
  width: 100%;
  height: 350px;
  border-radius: 8px;
  margin-bottom: 24px;
`;
  
export const ItensGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;
  
  li {
    background: #f5f5f5;
    border: 2px solid #f5f5f5;
    height: 180px;
    border-radius: 8px;
    padding: 32px 24px 16px;
  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  
    text-align: center;
  
    cursor: producter;

    span {
      flex: 1;
      margin-top: 12px;
    
      display: flex;
      align-items: center;
      color: ${titleColor};
    }
  }
  
  li.selected {
    background: #E1FAEC;
    border: 2px solid #34CB79;
  }
`;
  