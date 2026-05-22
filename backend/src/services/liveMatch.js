import { prisma } from "../lib/prisma.js";

const submitTriesMap = new Map();
let playerArray = [];

export const liveMatch = async (data, ws) => {
  const tries = submitTriesMap.get(data.matchID) ?? 1;

  if (tries === 0) {
    console.log("Cannot send more data: Game submitted");
    return;
  }
  switch (data.event) {
    case "playerGoal":
      await addGoalToMatchStats(
        data.playerID,
        data.matchID,
        data.scoreUs,
        data.scoreOpp,
        ws,
      );
      break;
    case "oppGoal":
      await addGoalToMatchStatsOpp(
        data.matchID,
        data.scoreUs,
        data.scoreOpp,
        ws,
      );
      break;
    case "playerShotOn":
      await addShotOnToMatchStats(data.playerID, data.matchID, ws);
      break;
    case "playerShotOff":
      await addShotOutToMatchStats(data.playerID, data.matchID, ws);
      break;
    case "playerFoul":
      await addFoulToMatchStats(data.playerID, data.matchID, data.foulType, ws);
      break;
    case "playerSave":
      await addSaveToMatchStats(data.playerID, data.matchID, ws);
      break;
    case "playerSubs":
      await addSubMatchStats(data.jerseyNum, data.matchID, ws);
      break;
    case "submitGame":
      await addTimeToMatch(data.matchID, data.time, ws);
      break;
  }
};
export const addGoalToMatchStats = async (
  playerID,
  matchID,
  scoreUs,
  scoreOpp,
  ws,
) => {
  const currentStats = await prisma.matchStats.findUnique({
    where: {
      match_id_player_id: {
        match_id: matchID,
        player_id: playerID,
      },
    },
  });

  const currentRedCards = currentStats?.red_cards ?? 0;

  if (currentRedCards < 1) {
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

    ws.send(
      JSON.stringify({
        event: "goal",
      }),
    );

    return matchStats;
  } else {
    console.log("Spiller har fået et rødt kort; mål kan ikke indsættes");
    ws.send(
      JSON.stringify({
        event: "alert",
      }),
    );
    return;
  }
};

export const addGoalToMatchStatsOpp = async (
  matchID,
  scoreUs,
  scoreOpp,
  ws,
) => {
  // No player involved, so no red card check needed
  const matchStats = await prisma.match.update({
    where: { id: matchID },
    data: {
      score_home: scoreUs,
      score_away: scoreOpp + 1,
    },
  });

  return matchStats;
};

export const addShotOnToMatchStats = async (playerID, matchID, ws) => {
  const currentStats = await prisma.matchStats.findUnique({
    where: {
      match_id_player_id: {
        match_id: matchID,
        player_id: playerID,
      },
    },
  });

  const currentRedCards = currentStats?.red_cards ?? 0;

  if (currentRedCards < 1) {
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

    ws.send(
      JSON.stringify({
        event: "goal",
      }),
    );

    return matchStats;
  } else {
    console.log(
      "Spiller har fået et rødt kort; skud på mål kan ikke indsættes",
    );
    ws.send(
      JSON.stringify({
        event: "alert",
      }),
    );
    return;
  }
};

export const addShotOutToMatchStats = async (playerID, matchID, ws) => {
  const currentStats = await prisma.matchStats.findUnique({
    where: {
      match_id_player_id: {
        match_id: matchID,
        player_id: playerID,
      },
    },
  });

  const currentRedCards = currentStats?.red_cards ?? 0;

  if (currentRedCards < 1) {
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
  } else {
    console.log(
      "Spiller har fået et rødt kort; skud uden for mål kan ikke indsættes",
    );
    ws.send(
      JSON.stringify({
        event: "alert",
      }),
    );
    return;
  }
};

export const addFoulToMatchStats = async (playerID, matchID, foulType, ws) => {
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
  const currentSuspTime = currentStats?.two_min_susp ?? 0;

  if (currentRedCards < 1) {
    for (const foul of foulType) {
      switch (foul) {
        case "RødtK":
          red_cards = 1;
          break;
        case "Udvisning":
          two_min_suspension = 2;
          if (currentSuspTime + 2 >= 6) {
            red_cards = 1;
          }
          break;
        case "Frikast":
          free_throws = 1;
          break;
        case "Straffekast":
          penalty_throws = 1;
          break;
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
        red_cards: { increment: red_cards },
        two_min_susp: { increment: two_min_suspension },
        free_throws: { increment: free_throws },
        penalty_throws: { increment: penalty_throws },
      },
    });

    return matchStats;
  } else {
    ws.send(
      JSON.stringify({
        event: "alert",
      }),
    );
  }
};

export const addSaveToMatchStats = async (playerID, matchID, ws) => {
  const currentStats = await prisma.matchStats.findUnique({
    where: {
      match_id_player_id: {
        match_id: matchID,
        player_id: playerID,
      },
    },
  });

  const currentRedCards = currentStats?.red_cards ?? 0;

  if (currentRedCards < 1) {
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
  } else {
    console.log("Spiller har fået et rødt kort; redning kan ikke indsættes");
    ws.send(
      JSON.stringify({
        event: "alert",
      }),
    );
    return;
  }
};

export const addSubMatchStats = async (jerseyNum, matchID, ws) => {
  // Insert the received jersey number into the array
  playerArray.push(jerseyNum);

  // Wait until both players are received
  if (playerArray.length < 2) return;
  const playerIn = playerArray[0];
  const playerOut = playerArray[1];
  let temp = 0;

  const match = await prisma.match.findUnique({
    where: { id: matchID },
  });

  let playersInArray = [...match.in_players];

  for (let i = 0; i < playersInArray.length; i++) {
    temp = parseInt(playersInArray[i].split("#").pop());
    if (temp === parseInt(playerIn)) {
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

  ws.send(
    JSON.stringify({
      event: "playerSubs",
    }),
  );

  // Reset the array for the next substitution
  playerArray = [];
};

export const addTimeToMatch = async (matchID, time, ws) => {
  const tries = submitTriesMap.get(matchID) ?? 1;
  submitTriesMap.set(matchID, tries - 1);

  const matchStats = await prisma.match.update({
    where: { id: matchID },
    data: {
      match_time: time,
    },
  });

  ws.send(
    JSON.stringify({
      event: "submitSuccess",
    }),
  );

  return matchStats;
};
