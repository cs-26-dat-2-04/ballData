import { getSeasonStatsByTeamId } from "../services/stats.js";
import { getMatchStatsByPlayerId } from "../services/stats.js";

export const getSeasonStats = async (req, res) => {
  try {
    const teamId = req.params.teamId;

    const stats = await getSeasonStatsByTeamId({ teamId });

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente sæsonstatistik" });
  }
};

export const getPlayerStats = async (req, res) => {
  try {
    const stats = await getMatchStatsByPlayerId(
      req.params.playerId,
      req.coach.id,
    );
    res.json(stats);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};