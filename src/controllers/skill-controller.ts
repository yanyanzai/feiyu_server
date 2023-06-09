import type {Skill as SkillType} from '../models/skill-model';
import Skill, {SkillFields} from '../models/skill-model';

function getAllSkills(fields: string[]): Promise<SkillType[]> {
  let skillsQuery = Skill.find();
  if (fields.length !== 0) {
    skillsQuery = skillsQuery.select(fields);
  }
  return skillsQuery;
}

function getSkillById(id: string, fields: string[]): Promise<SkillType | null> {
  let skillQuery = Skill.findById(id);
  if (fields.length !== 0) {
    skillQuery = skillQuery.select(fields);
  }
  return skillQuery;
}

function createSkill(skillData: {[key: string]: any}): Promise<SkillType> {
  const skill = new Skill(skillData);
  return skill.save();
}

function updateSkill(
  id: string,
  skillData: {[key: string]: any}
): Promise<SkillType | null> {
  return Skill.findByIdAndUpdate(id, skillData, {new: true});
}

function deleteSkill(id: string): Promise<null> {
  return Skill.findByIdAndDelete(id);
}

export default {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
