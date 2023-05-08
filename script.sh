echo "Enter the server"
read var
if [[ $var =~ "production" ]];then
  rm .env
  cat .env-prodution >> .env
elif [[ $var =~ "staging" ]];then
  rm .env
  cat .env-staging >> .env
elif [[ $var =~ "development" ]];then
  rm .env
  cat .env-development >> .env
fi
git pull
npm ci
npm run build
        mv /var/www/staging.vidh.ai/agaile-frontend/build /var/www/staging.vidh.ai/agaile-frontend/build-$DATE
        mv build /var/www/staging.vidh.ai/agaile-frontend/