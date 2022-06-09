docker-compose            \ # compose 
-f docker-compose.yml     \ # running base compose file with -f flag
-f docker-compose.dev.yml \ # running development compose file with -f flag
up                        \ # up command
-d                          # detached mode