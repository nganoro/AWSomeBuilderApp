import {createReducer, on, props} from "@ngrx/store";
import { Skills } from "../skills.model";
import { TeamMember } from "../TeamMember";
import {sendingUserSkill} from "./user.action";

export const initialTeamMemberState: TeamMember[] = [];
export const initialSkillState: Skills = new Skills();

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
