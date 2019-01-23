read -p 'Commit message: ' message
git commit -am "$message"
git push origin master
if [[ $1 == 'client' ]]
then
  cd packages/client
  git commit -am "$message"
  git push origin master
fi