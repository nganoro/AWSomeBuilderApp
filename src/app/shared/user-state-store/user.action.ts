import {createAction, props} from "@ngrx/store";
import {Skills} from "../skills.model";
import {TeamMember} from "../TeamMember";

export const sendingUserSkill = createAction(
  '[User Action Component] Sending Customer Skill', props<{skill: Skills}>()
);

export const sendingFilterResults = createAction(
  '[User Action Component] Sending Filter Result', props<{teamMember: TeamMember[]}>()
);

export const sendingAllSkills = createAction(
  '[User Action Component] Sending All User Skills', props<{allSkills: Skills[]}>()
);

export const clearTable = createAction(
  '[User Action Component] Clear Table');
