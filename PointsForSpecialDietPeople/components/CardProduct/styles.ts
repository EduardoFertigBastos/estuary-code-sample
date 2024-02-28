import { shade } from 'polished';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { buttonHover, primaryColor } from '../../styles/variables';


const mainColorCard = '#f78e7c';

interface CardProps {
  isVisible?: boolean;
}

export const Card = styled.div<CardProps>`
  width: 320px;
  height: 370px;
  border-radius: 25px;
  background-color: #fefefe;
  margin: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);

  ${props =>
    !props.isVisible &&
    css`
      display: none;
  `}
`;

export const CardImage = styled.div`
  position: relative;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background: #fff;
  padding: 3px;
`;

export const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid ${mainColorCard};
`;

export const ImageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 14px;
  row-gap: 5px;
  position: relative;
  padding: 25px 0px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 14px;
`;

export const Overlay = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${mainColorCard};
  border-radius: 25px 25px 0 25px;


  &::before, &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -40px;
    height: 40px;
    width: 40px;
    background-color: ${mainColorCard};
  }

  &::after {
    border-radius: 0 25px 0 0;
    background-color: #fff;
  }
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #333;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #707070;
  text-align: center;
`;

export const CardButton = styled(Link)`
  border: none;
  font-size: 16px;
  color: #fff;
  padding: 8px 16px;
  background-color: ${mainColorCard};
  border-radius: 6px;
  text-decoration: none;
  margin: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e87b68;
  }
`;



