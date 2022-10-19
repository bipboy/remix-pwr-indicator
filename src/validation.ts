import { StrengthTitleT } from "./components/PasswordStrengthIndicator";

export const validatePassword = (
  score = 0,
  strengthTitle?: StrengthTitleT
): {
  strength: string;
} => {
  const res = {
    strength: "",
  };

  switch (score) {
    case 0:
      res.strength = strengthTitle?.weak ? strengthTitle.weak : "Weak";
      break;
    case 1:
      res.strength = strengthTitle?.weak ? strengthTitle.weak : "Weak";
      break;
    case 2:
      res.strength = strengthTitle?.bad ? strengthTitle.bad : "Bad";
      break;
    case 3:
      res.strength = strengthTitle?.good ? strengthTitle.good : "Good";
      break;
    case 4:
      res.strength = strengthTitle?.strong ? strengthTitle.strong : "Strong";
      break;
  }

  return { ...res };
};
