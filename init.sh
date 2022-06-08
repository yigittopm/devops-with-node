docker run               \  # run command
-d                       \  # detached mode
--name my-node-container \  # container name
-v $(pwd):/app           \  # assign volume
-v /app/node_modules     \  # node_modules bind
-e PORT=5000             \  # other way (--env-file ./.env)
-p 3000:5000             \  # port binding
my-node                     # my image name
