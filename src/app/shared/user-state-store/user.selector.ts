import {createFeature, createFeatureSelector, createSelector, on, props, State} from "@ngrx/store";
import { Skills } from "../skills.model";
import { TeamMember } from "../TeamMember";

export const selectUserSkills = createFeatureSelector<Skills>(
  'userSkills'
);

export const selectFilterResult = createFeatureSelector<TeamMember[]>(
  'searchFilterResult'
);

export const selectSkill = createSelector(
  selectUserSkills,
  (state: Skills) => state
)

export const selectFilter = createSelector(
  selectFilterResult,
  (state: TeamMember[]) => state
)
