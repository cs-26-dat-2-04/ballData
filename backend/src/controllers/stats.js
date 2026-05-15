import { getSeasonStatsByTeamId } from "../services/stats.js";

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
