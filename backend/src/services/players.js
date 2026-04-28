import { prisma } from "../lib/prisma.js";

export const getPlayersByTeamId = async(teamId) =>{
const players = await prisma.player.findMany({
    where:{team_id: teamId}
})
return players;
};

export const createPlayer = async(teamId, coachId, firstName, lastName, jerseyNumber) =>{

const team = await prisma.team.findUnique({
    where: { id: teamId},
});

if(!team){
    const error = new Error("Holdet findes ikke");
    error.status = 404;
    throw error;
}

if(team.coach_id!== coachId){
    const error = new Error("Du har ikke adgang til dette hold");
    error.status = 403;
    throw error;
}

if(!firstName||!lastName){
    const error = new Error("Navn er påkrævet")
    throw error;
}

if(jerseyNumber){
    if(!Number.isInteger(jerseyNumber)||jerseyNumber<0){
    const error = new Error("Trøjenummer skal være et positivt tal")
    throw error;
}

const existingPlayer = await prisma.player.findFirst({
    where: {team_id: teamId,
        jersey_number: jerseyNumber
    }
});

if(existingPlayer){
    const error = new Error("Der findes allerede en spiller med dette trøjenummer")
    error.status = 409;
    throw error
}
}


const player = await prisma.player.create({
data:{
    team: {
        connect: { id: teamId }
        },
    first_name: firstName,
    last_name: lastName,
    jersey_number: jerseyNumber
 },
});
return player
}


export const deletePlayer = async(coachId, playerId) =>{

const player = await prisma.player.findUnique({
    where: {id: playerId},
    include: {
        team: true
    }
});

if(!player){
    const error = new Error("Spiller ikke fundet");
    error.status = 404;
    throw error;
}

if(player.team.coach_id !== coachId){
const error = new Error("Du må kun slette dine egne spillere");
    error.status = 403;
    throw error;
}

await prisma.player.delete({where:{id: playerId}});
}

export const updatePlayer = async(coachId, playerId, firstName, lastName, jerseyNumber) =>{

    const existingPlayer = await prisma.player.findFirst({
    where: {id: playerId},
    include:{ team: true }

});

    if(existingPlayer.team.coach_id !== coachId){
    const error = new Error("Du har ikke adgang til dette hold");
    error.status = 403;
    throw error;
}

if(jerseyNumber !== undefined){
const PlayerWithJersey = await prisma.player.findFirst({
    where: {team_id: existingPlayer.team_id,
        jersey_number: jerseyNumber
    }
});

if(PlayerWithJersey.id !== playerId){
    const error = new Error("Der findes allerede en spiller med dette trøjenummer")
    error.status = 409;
    throw error
}
}

if(!Number.isInteger(jerseyNumber)||jerseyNumber<0){
    const error = new Error("Trøjenummer skal være et positivt tal")
    throw error;
}

const data = {};

if (firstName !== undefined) {
    data.first_name = firstName;
} else {
    data.first_name = existingPlayer.first_name;
}
if (lastName !== undefined){
    data.last_name = lastName;
} else {
data.last_name =existingPlayer.last_name;
}
if (jerseyNumber !== undefined){
      data.jersey_number = jerseyNumber;
} else {
    data.jersey_number = existingPlayer.jersey_number;
}


const player = await prisma.player.update({
    where: {id: playerId},
    data: {
        first_name: data.first_name,
        last_name: data.last_name,
        jersey_number: data.jersey_number
    }
});

return player
}