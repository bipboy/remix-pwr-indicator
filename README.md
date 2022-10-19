# remix-pwr-indicator
Remix password strength indicator based on wasm

## Info
Remix iplementation password indicator component based on wasm.

![example_pwr](https://user-images.githubusercontent.com/17404342/196585249-0eeb5501-1aff-4feb-bf9d-dccfe3111566.jpg)

## Install
```
$ npm install @bipboys/remix-pwr-indicator @bipboys/pwr-scoring
```
## Usage

#### Add data route for work with wasm, like .../route/pwr.tsx
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

## Remix support
Tested with 1.7.2 version.

## License
the MIT license.

