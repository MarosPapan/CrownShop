// @ts-nocheck
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react';
import leftArrow from '../../assets/images/left-arrow.svg';
import rightArrow from '../../assets/images/right-arrow.svg';

const Arrow = ({ direction, handleClick }) => (
  <div
    onClick={handleClick}
    css={css`
        position: absolute;
        top: 40%;
        ${direction === 'right' ? `right: 25px` : `left: 25px`};
        justify-content: center;
        cursor: pointer;
        align-items: center;
        transition: transform ease-in 0.1s;
        &:hover {
            transform: scale(1.1);
        }
        img {
            transform: translateX(${direction === 'left' ? '-2' : '2'}px);
            &:focus {
            outline: 0;
            }
        }
    `}
  >
    {direction === 'right' ? <img src={rightArrow} /> : <img src={leftArrow} />}
  </div>
)

export default Arrow