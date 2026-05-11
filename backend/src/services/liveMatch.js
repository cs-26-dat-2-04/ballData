import { prisma } from "../lib/prisma.js";

export const liveMatch = async (data) => {
    switch (data.type) {
        case "playerGoal":
            await addGoalToMatchStats(data.playerID, data.matchID);
            break;
    }
}

export const addGoalToMatchStats = async (playerID, matchID) => {
    const matchStats = await prisma.matchStats.update({
        where: { 
            match_id_player_id: {
                match_id: matchID,
                player_id: playerID
            }
        },
        data: {
            goals: { increment: 1 }
          }
        });
    return matchStats;
}