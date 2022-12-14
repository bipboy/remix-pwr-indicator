# remix-pwr-indicator
Remix password strength indicator based on wasm

[![NPM](https://nodei.co/npm/@bipboys/remix-pwr-indicator.png?mini=true)](https://nodei.co/npm/@bipboys/remix-pwr-indicator/)

[![NPM](https://nodei.co/npm/@bipboys/pwr-scoring.png?mini=true)](https://nodei.co/npm/@bipboys/pwr-scoring/)

[![Version](https://img.shields.io/npm/v/@bipboys/remix-pwr-indicator.svg)](https://www.npmjs.com/package/@bipboys/remix-pwr-indicator)
[![Version](https://img.shields.io/npm/v/@bipboys/pwr-scoring.svg)](https://www.npmjs.com/package/@bipboys/pwr-scoring)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/npm/l/@bipboys/remix-pwr-indicator.svg)](https://www.npmjs.com/package/@bipboys/remix-pwr-indicator)

## Info
Remix iplementation password indicator component based on wasm.

![example_pwr](https://user-images.githubusercontent.com/17404342/196585249-0eeb5501-1aff-4feb-bf9d-dccfe3111566.jpg)

## Install
```
$ npm install @bipboys/remix-pwr-indicator @bipboys/pwr-scoring
```
## Usage

#### Add data route for work with wasm, like .../routes/pwr.tsx

> WASM are used to get the scoring value, but you can do use your own solution. Scoring get with zxcvbn rust package. Function scoring(password: string) return a value from 0 to 4. If you want to get all of the entropy data from zxcvbn package please use entropy(password: string) function.

```ts
import { LoaderArgs, json } from "@remix-run/node";

import { scoring } from "@bipboys/pwr-scoring";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  let scoringValue: number | null = null;

  if (typeof query === "string") {
    if (query.length > 0) {
      scoringValue = scoring(query);
    }
  }

  return json({
    scoring: scoringValue,
  });
}
```

#### Add fetcher in your component, where you want to use it and return score from wasm package
```ts
  // Fetch data from .../route/pwr.tsx
  let fetcherPWR = useFetcher();

  // Get value from onChange callback in password input 
  function handleChange(value: any) {
    fetcherPWR.load(`/pwr?query=${value}`);
  }

  const pwrScore = fetcherPWR.data?.scoring;
```

#### Add password strength indicator with props
```ts
   <PasswordStrengthIndicator
     score={pwrScore}
     strengthTitle={{
       weak: "To short",
       bad: "Bad",
       good: "Good",
       strong: "Strong",
     }}
     strengthColor={[
       "#000",
       "#D44333",
       "#FFC043",
       "#21A453",
       "#21A453",
     ]}
   />
```

#### Component Props

```ts
type StrengthTitleT = {
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
```

## Remix support
Tested with 1.7.2 version.

## License
the MIT license.

