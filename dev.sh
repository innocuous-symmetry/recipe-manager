#! /bin/bash
concurrently "cd server && npm run dev" "cd client && npm run dev"