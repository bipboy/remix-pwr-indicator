import * as React from 'react';

import {Indicator, Indicators} from './Indicators';

import {validatePassword} from '../validation';

export type StrengthTitleT = {
  weak?: string;
  bad?: string;
  good?: string;
  strong?: string;
};

interface PasswordStrengthIndicatorI {
  score: number;
  strengthColor?: string[];
  strengthTitle?: StrengthTitleT;
  showLabel?: boolean;
  styleLabel?: React.CSSProperties;
  styleIndicator?: React.CSSProperties;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorI> = (
  props
) => {
  const {
    score,
    strengthTitle,
    strengthColor,
    showLabel = true,
    styleLabel,
    styleIndicator
  } = props;

  const [{strength}, setValidations] = React.useState({
    ...validatePassword(score, strengthTitle)
  });

  React.useEffect(() => {
    const validationData = validatePassword(score, strengthTitle);
    setValidations({...validationData});
  }, [score, strengthTitle]);

  return (
    <div style={{margin: '2% 0 0'}}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '1rem',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box'
          }}
        >
          <Indicators
            styleIndicator={styleIndicator}
            strengthColor={strengthColor}
          >
            <Indicator score={score >= 1 ? score : 0} />
            <Indicator score={score >= 2 ? score : 0} />
            <Indicator score={score >= 3 ? score : 0} />
            <Indicator score={score >= 4 ? score : 0} />
          </Indicators>
        </div>
        {showLabel ? (
          <span
            style={{
              color: '#000000',
              fontFamily:
                "system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '16px',
              margin: 0,
              opacity: score ? 1 : 0,
              marginTop: '.5rem',
              textAlign: 'right',
              height: '1rem',
              ...styleLabel
            }}
          >
            {strength}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
