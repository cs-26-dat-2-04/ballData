import * as teamsService from "../services/teams.js";

export const createTeam = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Holdet mangler et navn",
    });
  }

  try {
    const team = await teamsService.createTeam(req.coach.id, name);
    res.status(201).json(team);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};

export const getTeam = async (req, res) => {
  try {
    const team = await teamsService.getTeamById(req.params.id, req.coach.id);
    res.json(team);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};
