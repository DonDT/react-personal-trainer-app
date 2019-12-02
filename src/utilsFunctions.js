const validationRules = (value, rules, form) => {
  let valid = true;

  for (let rule in rules) {
    switch (rule) {
      case "isRequired":
        valid = valid && validateisRequired(value);
        break;
      case "isEmail":
        valid = valid && validateEmail(value);
        break;
      case "minLength":
        valid = valid && validateMinLength(value, rules[rule]);
        break;
      case "confirmPassword":
        valid =
          valid &&
          validateConfirmPassword(
            value,
            form.register[rules.confirmPassword].value
          );
        break;

      default:
        valid = true;
    }
  }

  return valid;
};

const validateisRequired = value => {
  if (value.trim() !== "") {
    return true;
  } else return false;
};

const validateEmail = email => {
  const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return expression.test(String(email).toLocaleLowerCase());
};

const validateMinLength = (value, ruleValue) => {
  if (value.length >= ruleValue) {
    return true;
  }
  return false;
};

const validateConfirmPassword = (password, anotherPassword) => {
  return password === anotherPassword;
};

export default validationRules;
