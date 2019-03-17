
for var in $(printenv); do
    if [[ $var == PRISMA_* ]] ;
    then
        echo "$var" >> .env
    fi
done