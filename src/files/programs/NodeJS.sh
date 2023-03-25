echo " "
echo "========================== INSTALLING --> NVM"
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

echo " "
echo "========================== INSTALLING --> NODE.JS"
nvm install --lts
nvm install 10.16.0

source ~/.nvm/nvm.sh
