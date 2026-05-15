#!/bin/sh
echo "Running migrations..."
npx prisma migrate deploy
echo "Migrations done, starting server..."
node src/index.js
echo "Server exited with code $?"