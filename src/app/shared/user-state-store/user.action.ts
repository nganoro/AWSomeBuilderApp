import {createAction, props} from "@ngrx/store";
import {Skills} from "../skills.model";
import {TeamMember} from "../TeamMember";

export const sendingUserSkill = createAction(
  '[User Action Component] Sending Customer Skill', props<{skill: Skills}>()
);

export const sendingFilterResults = createAction(
  '[User Action Component] Sending Filter Result', props<{teamMember: TeamMember[]}>()
);
