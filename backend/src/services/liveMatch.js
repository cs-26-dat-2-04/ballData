import { prisma } from "../lib/prisma.js";

// Send boolean for if the match is finished turn it to true, so it makes sure that the page cannot be revisited

export const liveMatch = async (data) => {
  switch (data.event) {
    case "playerGoal":
      await addGoalToMatchStats(
        data.playerID,
        data.matchID,
        data.scoreUs,
        data.scoreOpp,
      );
      break;
    case "oppGoal":
      await addGoalToMatchStatsOpp(data.matchID, data.scoreUs, data.scoreOpp);
      break;
    case "playerShotOn":
      await addShotOnToMatchStats(data.playerID, data.matchID);
      break;
    case "playerShotOff":
      await addShotOutToMatchStats(data.playerID, data.matchID);
      break;
    case "playerFoul":
      await addFoulToMatchStats(data.playerID, data.matchID, data.foulType);
      break;
    case "playerSave":
      await addSaveToMatchStats(data.playerID, data.matchID);
      break;
    case "playerSubs":
      await addSubMatchStats(data.jerseyNum, data.matchID);
      break;
  }
};

export const addGoalToMatchStats = async (
  playerID,
  matchID,
  scoreUs,
  scoreOpp,
) => {
  const matchStats = await prisma.matchStats.update({
    where: {
      match_id_player_id: {
        match_id: matchID,
        player_id: playerID,
      },
    },
    data: {
      goals: { increment: 1 },
    },
  });

  await prisma.match.update({
    where: { id: matchID },
    data: {
      score_home: scoreUs + 1,
      score_away: scoreOpp,
    },
  });

  return matchStats;
};

export const addGoalToMatchStatsOpp = async (matchID, scoreUs, scoreOpp) => {
  const matchStats = await prisma.match.update({
    where: { id: matchID },
    data: {
      score_home: scoreUs,
      score_away: scoreOpp + 1,
    },
  });

  return matchStats;
};

export const addShotOnToMatchStats = async (playerID, matchID) => {
  const matchStats = await prisma.matchStats.update({
    where: {
      match_id_player_id: {
        match_id: matchID,
        player_id: playerID,
      },
    },
    data: {
      shots_on_goal: { increment: 1 },
    },
  });
  return matchStats;
};

export const addShotOutToMatchStats = async (playerID, matchID) => {
  const matchStats = await prisma.matchStats.update({
    where: {
      match_id_player_id: {
        match_id: matchID,
        player_id: playerID,
      },
    },
    data: {
      shots_off_goal: { increment: 1 },
    },
  });
  return matchStats;
};

export const addFoulToMatchStats = async (playerID, matchID, foulType) => {
  let yellow_cards = 0;
  let red_cards = 0;
  let two_min_suspension = 0;
  let free_throws = 0;
  let penalty_throws = 0;

  const currentStats = await prisma.matchStats.findUnique({
    where: {
      match_id_player_id: {
        match_id: matchID,
        player_id: playerID,
      },
    },
  });

  const currentRedCards = currentStats?.red_cards ?? 0;
  const currentYellowCards = currentStats?.yellow_cards ?? 0;
  const currentSuspTime = currentStats?.two_min_susp ?? 0;
  const frikast = currentStats?.free_throws ?? 0;

  if (currentRedCards < 1) {
    for (const foul of foulType) {
      switch (foul) {
        case "GultK":
          if (currentYellowCards < 1) yellow_cards = 1;
          break;
        case "RødtK":
          red_cards = 1;
          break;
        case "Udvisning":
          two_min_suspension = 2;
          if (currentSuspTime + 2 >= 6) red_cards = 1;
          break;
        case "Frikast":
          free_throws = 1;
          break;
        case "Straffekast":
          penalty_throws = 1;
          break;
      }
    }
  }

  const matchStats = await prisma.matchStats.update({
    where: {
      match_id_player_id: {
        match_id: matchID,
        player_id: playerID,
      },
    },
    data: {
      yellow_cards: { increment: yellow_cards },
      red_cards: { increment: red_cards },
      two_min_susp: { increment: two_min_suspension },
      free_throws: { increment: free_throws },
      penalty_throws: { increment: penalty_throws },
    },
  });
  console.log(currentRedCards);
  console.log(currentYellowCards);
  console.log(currentSuspTime);
  console.log(frikast);

  return matchStats;
};

export const addSaveToMatchStats = async (playerID, matchID) => {
  const matchStats = await prisma.matchStats.update({
    where: {
      match_id_player_id: {
        match_id: matchID,
        player_id: playerID,
      },
    },
    data: {
      saves: { increment: 1 },
    },
  });
  return matchStats;
};

let playerArray = [];

export const addSubMatchStats = async (jerseyNum, matchID) => {
  // Insert the received jersey number into the array
  playerArray.push(jerseyNum);
  console.log(playerArray);
  // Wait until both players are received
  if (playerArray.length < 2) return;
  const playerIn = playerArray[0];
  const playerOut = playerArray[1];
  let temp = 0;
  console.log(playerIn);
  const match = await prisma.match.findUnique({
    where: { id: matchID },
  });

  let playersInArray = [...match.in_players];

  for (let i = 0; i < playersInArray.length; i++) {
    temp = parseInt(playersInArray[i].split("#").pop());
    if (temp === parseInt(playerIn)) {
      console.log("hello");
      playersInArray[i] = `#${playerOut}`;
      break;
    }
  }

  await prisma.match.update({
    where: { id: matchID },
    data: {
      in_players: playersInArray,
    },
  });

  // Reset the array for the next substitution
  playerArray = [];
};
