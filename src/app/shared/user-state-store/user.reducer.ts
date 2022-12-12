import {createReducer, on} from "@ngrx/store";
import { Skills } from "../skills.model";
import { TeamMember } from "../TeamMember";
import {clearTable, sendingAllSkills, sendingFilterResults, sendingUserSkill} from "./user.action";

export const initialSkillState: Skills = new Skills();

export interface State {
  currentTeam: TeamMember[]
}
export const initialFilterResult: State = {
  currentTeam: []
};

export interface skillState {
  currentUserSkills: Skills[]
}

export const initialUserSkills: skillState = {
  currentUserSkills: []
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
  }),
  on(clearTable, (state) => {
    return {
      ...state,
    currentTeam: [] = []}
  })
);

export const userSkillsReducer = createReducer(
  initialFilterResult,
  on(sendingAllSkills, (state, {allSkills} ) => {
    return {
      ...state,
      currentUserSkills: allSkills
    }
  })
);
