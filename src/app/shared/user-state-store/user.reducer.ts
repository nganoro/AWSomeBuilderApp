import {createReducer, on, props} from "@ngrx/store";
import { Skills } from "../skills.model";
import { TeamMember } from "../TeamMember";
import { sendingFilterResults, sendingUserSkill} from "./user.action";

export const initialSkillState: Skills = new Skills();

export interface State {
  currentTeam: TeamMember[]
}
export const initialFilterResult: State = {
  currentTeam: []
};

export const userReducer = createReducer(
  initialSkillState,
  on(sendingUserSkill, (state, action) => {
    return {
      ...state,
      service: action.skill.service,
      proficiency: action.skill.proficiency
    }
  })
);

export const searchResultReducer = createReducer(
  initialFilterResult,
  on(sendingFilterResults, (state, {teamMember} ) => {
    return {
      ...state,
      currentTeam: teamMember
    }
  })
);
