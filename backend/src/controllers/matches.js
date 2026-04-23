import * as matchService from "../services/matches.js";

const ALLOWED_STAT_FIELDS = [
  "goals",
  "assists",
  "shots",
  "saves",
  "yellow_cards",
  "red_cards",
  "minutes_played",
];

const extractStatFields = (body) => {
  return Object.fromEntries(
    Object.entries(body).filter(([key]) => ALLOWED_STAT_FIELDS.includes(key)),
  );
};

export const getMatchStats = async (req, res) => {
  try {
    const matchStats = await matchService.getStatsByMatch(
      req.params.matchId,
      "03aa43ad-a2e8-47c4-92a6-ca154aa6b5eb",
    );
    res.json(matchStats);
  } catch (err) {
    res.status(err.status ?? 500).json({ err: err.message });
  }
};

export const upsertStats = async (req, res) => {
  const { player_id } = req.body;

  if (!player_id) {
    return res.status(400).json({ error: "player_id er påkrævet" });
  }

  const data = extractStatFields(req.body);
  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .json({ error: "Der skal være mindst et statistikfelt" });
  }

  try {
    const stats = await matchService.upsertStats(
      req.params.matchId,
      req.coach.id,
      player_id,
      data,
    );
    res.status(201).json(stats);
  } catch (err) {
    res.status(err ?? 500).json({ error: err.message });
  }
};
