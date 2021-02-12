echo " "
echo "############################## INSTALLING --> TERMINAL ZSH WITH OH-MY-ZSH"
yum install zsh -y
chsh -s /bin/zsh root
echo $SHELL
yum install wget git -y
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh
/bin/cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
source ~/.zshrc

echo " "
echo "=================== INSTALLING E CONFIGURANDO PLUGINS ....."
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf && sed -i '/ask ".*/s/^/#/g' ~/.fzf/install && ~/.fzf/install
git clone https://github.com/supercrabtree/k $ZSH_CUSTOM/plugins/k
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions && autoload -U compinit && compinit
sed -i "s|^plugins=(git)|plugins=(git zsh-syntax-highlighting fzf zsh-autosuggestions k zsh-completions)|g" ~/.zshrc
source ~/.zshrc

echo " "
echo "=================== CONFIGURANDO TEMA ....."
sed -i 's|^ZSH_THEME=.*|ZSH_THEME="af-magic"|g' ~/.zshrc
source ~/.zshrc