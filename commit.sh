read -p 'Commit message: ' message
git add .
git commit -m "$message"
git push origin master
if [ $1 = 'client' ]
then
  cd packages/client
  git add .
  git commit -m "$message"
  git push origin master
fi