import * as React from 'react';
import styled, { BaseThemedCssFunction } from 'styled-components';
import { SELECTED_STATE, UNLOCKED_STATE, LOCKED_STATE } from '../constants';
import { Skill } from '../../models';
import Icon from './Icon';

const keyframes = require('styled-components').keyframes;
const css: BaseThemedCssFunction<any> = require('styled-components').css;

interface Props {
  handleClick: VoidFunction;
  id: string;
  currentState: string;
  skill: Skill;
}

interface StyledNodeProps {
  optional: boolean;
  selected: boolean;
  unlocked: boolean;
  locked: boolean;
}

const Node = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLDivElement>) => {
    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
      if (e.keyCode === 13) {
        handleClick();
      }
    }
    const { handleClick, id, currentState, skill } = props;

    return (
      <StyledNode
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={ref}
        data-testid={id}
        optional={skill.optional || false}
        selected={currentState === SELECTED_STATE}
        unlocked={currentState === UNLOCKED_STATE}
        locked={currentState === LOCKED_STATE}
      >
        {'icon' in skill ? (
          <IconNode>
            <Icon title="node-icon" src={skill.icon} containerWidth={64} />
          </IconNode>
        ) : (
          <TextNode>
            <Text>{skill.title}</Text>
          </TextNode>
        )}
      </StyledNode>
    );
  }
);

export default Node;

const shadowburst = keyframes`
  from {
    box-shadow: 0 0 18px 0 rgba(255, 255, 255, 1);
  }

  20% {
    box-shadow: 0 0 24px 0 rgba(255, 255, 255, 1);
  }

  to {
    box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0);
  }
`;

const shadowpulse = keyframes`
  from,
  20% {
    box-shadow: 0 0 8px 0 rgba(255, 255, 255, 0.5);
  }

  to {
    box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0.5);
  }
`;

const StyledNode = styled.div<StyledNodeProps>`
  background: ${({ theme }) => theme.nodeBackgroundColor};
  border: 2px solid;
  border-color: ${({ theme }) => theme.nodeBorderColor};
  box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0);
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  display: flex;
  margin: 0 3px;
  outline: none;
  position: relative;
  transition: box-shadow 0.6s, opacity 1s;
  user-select: none;

  @media (min-width: 410px) {
    margin: 0 8px;
  }

  @media (min-width: 900px) {
    margin: 0 16px;
    outline: initial;
    outline-color: white;
  }

  ${props =>
    props.selected &&
    css`
      animation: ${shadowburst} 1s 1;
      background: ${({ theme }) => theme.nodeActiveBackgroundColor};
    `}

  ${props =>
    props.unlocked &&
    css`
      animation: ${shadowpulse} 1s infinite alternate;
      box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.5);

      &:after,
      &:before {
        border: 0 solid;
        border-image-source: ${({ theme }) => theme.nodeHoverBorderColor};
        border-image-slice: 1;
        content: ' ';
        opacity: 0;
        height: 0;
        transition: opacity 0.6s, width 0.6s, height 0.6s;
        position: absolute;
        width: 0;
      }

      &:after {
        border-top: ${({ theme }) => theme.nodeHoverBorder};
        border-left: ${({ theme }) => theme.nodeHoverBorder};
        top: 0;
        left: 0;
      }

      &:before {
        bottom: 0px;
        right: 0px;
        border-bottom: ${({ theme }) => theme.nodeHoverBorder};
        border-right: ${({ theme }) => theme.nodeHoverBorder};
      }

      &:hover,
      &:focus {
        animation: none;
        box-shadow: 0 0 12px 0 rgba(255, 255, 255, 1);

        &:after,
        &:before {
          opacity: 1;
          height: 85%;
          width: 95%;
          transition: width 0.6s, height 0.6s;
        }
      }
    `}

    ${props =>
      props.unlocked &&
      props.optional &&
      css`
        background: ${({ theme }) => theme.nodeBackgroundColor};
      `}

  ${props =>
    props.locked &&
    `
        cursor: initial;
        opacity: 0.65;
    `}
`;

const IconNode = styled.div`
  width: ${({ theme }) => theme.nodeIconNodeWidth};
`;

const TextNode = styled.div`
  align-items: center;
  display: flex;
  font-weight: 600;
  justify-content: center;
  height: ${({ theme }) => theme.nodeMobileTextNodeHeight};
  width: ${({ theme }) => theme.nodeMobileTextNodeWidth};

  @media (min-width: 900px) {
    height: ${({ theme }) => theme.nodeDesktopTextNodeHeight};
    width: ${({ theme }) => theme.nodeDesktopTextNodeWidth};
  }
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.nodeMobileFontSize};
  text-overflow: ellipsis;
  margin: 0;
  overflow: hidden;
  padding: 0 8px;
  white-space: nowrap;

  @media (min-width: 900px) {
    font-size: ${({ theme }) => theme.nodeDesktopFontSize};
  }
`;
