docker-compose             \ # compose 
-f docker-compose.yml      \ # running base compose file with -f flag
-f docker-compose.prod.yml \ # running production compose file with -f flag
up                         \ # up command
-d                           # detached mode