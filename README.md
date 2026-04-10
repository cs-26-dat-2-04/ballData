# Design Architecture

---

## Database (Postgres)

### Tables

#### `coaches`

| Column        | Type    | Notes  |
| ------------- | ------- | ------ |
| id            | uuid    | PK     |
| email         | varchar | unique |
| password_hash | varchar |        |
| name          | varchar |        |

#### `teams`

| Column   | Type    | Notes        |
| -------- | ------- | ------------ |
| id       | uuid    | PK           |
| coach_id | uuid    | FK → coaches |
| name     | varchar |              |
| season   | varchar |              |

#### `players`

| Column     | Type    | Notes |
| ---------- | ------- | ----- |
| id         | uuid    | PK    |
| first_name | varchar |       |
| last_name  | varchar |       |
| position   | varchar |       |

#### `team_players` (join table)

| Column        | Type    | Notes        |
| ------------- | ------- | ------------ |
| team_id       | uuid    | FK → teams   |
| player_id     | uuid    | FK → players |
| jersey_number | varchar | Maybe?       |

#### `matches`

| Column     | Type    | Notes      |
| ---------- | ------- | ---------- |
| id         | uuid    | PK         |
| team_id    | uuid    | FK → teams |
| opponent   | varchar |            |
| match_date | date    |            |
| location   | varchar | Maybe?     |
| score_home | int     |            |
| score_away | int     |            |

#### `match_stats` (one row per player per match)

| Column         | Type | Notes                           |
| -------------- | ---- | ------------------------------- |
| id             | uuid | PK                              |
| match_id       | uuid | FK → matches                    |
| player_id      | uuid | FK → players                    |
| goals          | int  |                                 |
| assists        | int  |                                 |
| shots          | int  |                                 |
| saves          | int  |                                 |
| yellow_cards   | int  |                                 |
| red_cards      | int  |                                 |
| minutes_played | int  | Maybe find a way to track this? |

#### `player_notes` (Either as a table, or as a row in players table)

| Column     | Type      | Notes        |
| ---------- | --------- | ------------ |
| id         | uuid      | PK           |
| coach_id   | uuid      | FK → coaches |
| player_id  | uuid      | FK → players |
| content    | text      |              |
| created_at | timestamp |              |

#### `invite_tokens`

| Column     | Type      | Notes                                       |
| ---------- | --------- | ------------------------------------------- |
| id         | uuid      | PK                                          |
| coach_id   | uuid      | FK → coaches                                |
| match_id   | uuid      | FK → matches — token is scoped to one match |
| token      | varchar   | signed random token                         |
| expires_at | timestamp | probably 3-5 hours or smth                  |
| used       | boolean   | maybe for single use logic                  |

---

## API Endpoints (Express.js)

### Auth

| Method | Endpoint      | Auth  | Description                      |
| ------ | ------------- | ----- | -------------------------------- |
| POST   | /auth/login   | —     | Coach login, returns JWT         |
| POST   | /auth/invites | [JWT] | Generate invite link for a match |

### Players

| Method | Endpoint     | Auth  | Description                            |
| ------ | ------------ | ----- | -------------------------------------- |
| GET    | /players     | [JWT] | Get all players                        |
| GET    | /players/:id | [JWT] | Get player by ID (incl. stats history) |
| POST   | /players     | [JWT] | Create a player                        |
| PUT    | /players/:id | [JWT] | Update a player                        |
| DELETE | /players/:id | [JWT] | Delete a player                        |

### Teams

| Method | Endpoint   | Auth  | Description    |
| ------ | ---------- | ----- | -------------- |
| GET    | /teams     | [JWT] | Get all teams  |
| GET    | /teams/:id | [JWT] | Get team by ID |
| POST   | /teams     | [JWT] | Create a team  |
| PUT    | /teams/:id | [JWT] | Update a team  |
| DELETE | /teams/:id | [JWT] | Delete a team  |

### Matches

| Method | Endpoint     | Auth  | Description     |
| ------ | ------------ | ----- | --------------- |
| GET    | /matches     | [JWT] | Get all matches |
| GET    | /matches/:id | [JWT] | Get match by ID |
| POST   | /matches     | [JWT] | Create a match  |
| PUT    | /matches/:id | [JWT] | Update a match  |
| DELETE | /matches/:id | [JWT] | Delete a match  |

### Stats

| Method | Endpoint        | Auth    | Description                    |
| ------ | --------------- | ------- | ------------------------------ |
| GET    | /stats/:matchId | [JWT]   | Get all stats for a match      |
| POST   | /stats          | [TOKEN] | Submit stats (parent or coach) |
| PUT    | /stats/:id      | [TOKEN] | Update a stat entry            |

### Notes (or just add to player table as a row)

| Method | Endpoint         | Auth  | Description                |
| ------ | ---------------- | ----- | -------------------------- |
| GET    | /notes/:playerId | [JWT] | Get all notes for a player |
| POST   | /notes           | [JWT] | Create a note              |
| PUT    | /notes/:id       | [JWT] | Update a note              |
| DELETE | /notes/:id       | [JWT] | Delete a note              |

---

## Server (Next.js)

- Next.js serves the React frontend
- API routes can be handled by Express running alongside, or proxied via Next.js
- Use Express as seperate service

---

## Client (React / Next.js)

### Coach views

- Login page
- Team overview — aggregated stats across all players
- Player profile — individual stats over time + personal notes
- Match detail — full stat breakdown for one match
- Invite link generator — create and share parent invite links

### Parent view (invite-gated)

- Single stat entry screen for the match they were invited to
- Mobile-optimised (primary use case is live entry from a phone on the sideline)
- No login, no navigation — just the form for that one match
