export const buildTeams = (teamsHttpResponse) => {
  const teamsArray = Array.isArray(teamsHttpResponse)
    ? teamsHttpResponse
    : [teamsHttpResponse];

  const teamsNames = teamsArray?.map((team) => team?.Constructor?.name);

  return teamsNames;
};
