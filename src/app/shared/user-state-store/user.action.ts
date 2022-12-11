import {createAction, props} from "@ngrx/store";
import {Skills} from "../skills.model";

export const sendingUserSkill = createAction(
  '[User Action Component] Sending Customer Skill', props<{skill: Skills}>()
);
