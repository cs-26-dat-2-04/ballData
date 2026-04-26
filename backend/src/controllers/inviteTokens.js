import * as inviteTokensService from "../services/inviteTokens.js";

export const generateToken = async (req, res) => {
  try {
    const inviteToken = await inviteTokensService.generateInviteToken(
      req.params.matchId,
      req.coach.id,
    );

    const frontend = "http://localhost:3000";
    const inviteUrl = `${frontend}/invite/${inviteToken.token}`;

    res.status(201).json({
      token: inviteToken.token,
      invite_url: inviteUrl,
      expires_at: inviteToken.expires_at,
    });
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};

export const validateToken = async (req, res) => {
  try {
    const match = await inviteTokensService.validateInviteToken(
      req.params.token,
    );
    res.json(match);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};
