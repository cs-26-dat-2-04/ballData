import * as playersService from "../services/players.js";

export const getPlayers = async (req, res) => {
  try {
    const players = await playersService.getPlayersByTeamId(
      req.params.teamId,
      req.coach.id,
    );
    res.json(players);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};

export const createPlayer = async (req, res) => {
  const { firstName, lastName, jerseyNumber } = req.body;

  //if(!firstName||!lastName||!jerseyNumber){
  //  return res.status(400).json({ error: "Både navn og trøjenummer skal angives" });
  //}

  try {
    const player = await playersService.createPlayer(
      req.params.teamId,
      req.coach.id,
      firstName,
      lastName,
      jerseyNumber,
    );
    res.status(201).json(player);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    await playersService.deletePlayer(req.coach.id, req.params.playerId);
    res.status(204).send();
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const { firstName, lastName, jerseyNumber } = req.body;
    const player = await playersService.updatePlayer(
      req.coach.id,
      req.params.playerId,
      firstName,
      lastName,
      jerseyNumber,
    );
    res.status(201).json(player);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};
