import { FETCH_SKILLS, FETCH_STREAMS } from '../constants/skills/skillsFetchTypes';

export const fetchSkills = () => ({
  type: FETCH_SKILLS
});

export const fetchStreams = () => ({
  type: FETCH_STREAMS
});
