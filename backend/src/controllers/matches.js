import * as matchService from "../services/matches.js";
import { Location } from "@prisma/client";

const ALLOWED_STAT_FIELDS = [
  "goals",
  "assists",
  "shots",
  "saves",
  "yellow_cards",
  "red_cards",
  "minutes_played",
];

const MATCH_REQUIRED_FIELDS = [
  "opponent",
  "match_date",
  "location",
  "score_home",
  "score_away",
];

const extractStatFields = (body) => {
  return Object.fromEntries(
    Object.entries(body).filter(([key]) => ALLOWED_STAT_FIELDS.includes(key)),
  );
};

export const getMatches = async (req, res) => {
  try {
    const matches = await matchService.getMatchesByTeam(
      req.params.teamId,
      req.coach.id,
    );
    res.json(matches);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};

export const createMatch = async (req, res) => {
  const { opponent, match_date, location, in_players, score_home, score_away } = req.body;

  const missing = MATCH_REQUIRED_FIELDS.filter(
    (field) => req.body[field] === undefined,
  );
  if (missing.length > 0) {
    return res
      .status(400)
      .json({ error: `Følgende felter mangler: ${missing.join(", ")}` });
  }

  try {
    const matchDate = new Date(match_date);

    const scoreHome = parseInt(score_home);
    const scoreAway = parseInt(score_away);
    const result =
      scoreHome > scoreAway
        ? "win"
        : scoreHome == scoreAway
          ? "draw"
          : "loss";
    const match = await matchService.createMatch(
      req.params.teamId,
      req.coach.id,
      {
        opponent,
        match_date: matchDate,
        location,
        in_players,
        score_home: scoreHome,
        score_away: scoreAway,
        result,
      },
    );
    res.status(201).json(match);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};

export const getMatch = async (req, res) => {
  try {
    const match = await matchService.getMatchById(
      req.params.matchId,
      req.coach.id,
    );
    res.json(match);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};

export const getMatchStats = async (req, res) => {
  try {
    const matchStats = await matchService.getStatsByMatch(
      req.params.matchId,
      req.coach.id,
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
