import * as React from 'react';

import {
  CSSProperties,
  Children,
  Fragment,
  ReactNode,
  cloneElement,
  isValidElement
} from 'react';

const passwordStrengthIndicatorOpacity: Record<string, number> = {
  0: 0.15,
  1: 0.4,
  2: 0.6,
  3: 0.8,
  4: 1
};

const strengthColorCb = (score: number, input?: string[]) => {
  let result: string;

  switch (score) {
    case 0:
      result = input ? input[score] : '#000';
      break;
    case 1:
      result = input ? input[score] : '#D44333';
      break;
    case 2:
      result = input ? input[score] : '#FFC043';
      break;
    case 3:
      result = input ? input[score] : '#21A453';
      break;
    case 4:
      result = input ? input[score] : '#21A453';
      break;

    default:
      result = input ? input[0] : '#000';
      break;
  }

  return result;
};

export const Indicator = ({
  score = 0,
  strengthColor,
  style
}: {
  score: number;
  strengthColor?: string[];
  style?: CSSProperties;
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '8px',
        flex: '0.75',
        borderRadius: '5px',
        marginRight: '5px',
        backgroundColor: strengthColorCb(score, strengthColor),
        opacity: passwordStrengthIndicatorOpacity[score] ?? 0.15,
        ...style
      }}
    />
  );
};

export const Indicators = (props: {
  children: ReactNode;
  strengthColor?: string[];
  styleIndicator?: CSSProperties;
}) => {
  const childCount = Children.toArray(props.children).length;
  return (
    <Fragment>
      {Children.map(props.children, (child, index) => {
        if (isValidElement(child)) {
          const isLastChild = index === childCount - 1;
          if (isLastChild) {
            return cloneElement(child, {
              // @ts-expect-error
              style: {marginRight: 0, ...props.styleIndicator},
              strengthColor: props.strengthColor
            });
          }
          return (
            <>
              {cloneElement(child, {
                // @ts-expect-error
                style: {...props.styleIndicator},
                strengthColor: props.strengthColor
              })}
            </>
          );
        }
      })}
    </Fragment>
  );
};
