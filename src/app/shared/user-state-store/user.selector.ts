import {createFeature, createFeatureSelector, createSelector, on, props, State} from "@ngrx/store";
import { Skills } from "../skills.model";
import { TeamMember } from "../TeamMember";

export const selectUserSkills = createFeatureSelector<Skills>(
  'userSkills'
);

export const selectSkill = createSelector(
  selectUserSkills,
  (state: Skills) => state
)

// export const selectProficiency = createSelector(
//   selectUserSkills,
//   (state: Skills) => state.proficiency
// )
