import { Ability, AbilityBuilder } from "@casl/ability";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const ability = new Ability();

const checkPermission = (action, subject) => {
  return ability.can(action, subject);
};

export default checkPermission;

const defineRulesFor = (token) => {
  const decoded = jwtDecode(token);
  const role = decoded?.user?.role;

  const { can, rules } = new AbilityBuilder();

  switch (role.toLowerCase()) {
    case "admin":
      can("delete", "Todo");
      
      break;
    case "manager":
      can("edit", "Todo");
   
      break;
    case "employee":
      can("create", "Todo");
 
      break;
    default:
      can("read", "Todo");
     
  }

  return rules;
};
export const updateAbility = (token) => {
  const rules = defineRulesFor(token);
  ability.update(rules);
};
export const useAbilityEffect = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    updateAbility(token);
  }, [token]);
};
