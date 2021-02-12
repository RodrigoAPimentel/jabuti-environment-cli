AWX_USER=$1
AWX_PASSWORD=$2

echo " "
echo "############## INSTALL AWX"

echo " "
echo "========================== GIT"
yum install git -y

echo " "
echo "========================== NODE.JS"
yum install nodejs

echo " "
echo "========================== DOCKER"
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install -y docker-ce
systemctl enable docker
systemctl start docker
sudo ln -s var/lib/docker/ /docker

echo " "
echo "========================== DOCKER-COMPOSE"
LATEST_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r '.tag_name')
curl -L "https://github.com/docker/compose/releases/download/$LATEST_VERSION/docker-compose-$(uname -s)-$(uname -m)" > /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
usermod -aG docker $(whoami)

echo " "
echo "========================== AWX - DEPENDENCIES"
yum install -y python3-pip
pip3 install ansible
pip3 install selinux
pip3 install docker-compose

echo " "
echo "========================== AWX - DOWNLOAD"
cd ~
LATEST_AWX=$(curl -s https://api.github.com/repos/ansible/awx/tags |egrep name |head -1 |awk '{print $2}' |tr -d '"|,')
# LATEST_AWX=7.0.0
curl -L -o ansible-awx-$LATEST_AWX.tar.gz https://github.com/ansible/awx/archive/$LATEST_AWX.tar.gz && tar xvfz ansible-awx-$LATEST_AWX.tar.gz && rm -f ansible-awx-$LATEST_AWX.tar.gz
cd awx-$LATEST_AWX

echo " "
echo "========================== AWX - INITIAL CONFIGURATIONS"
sed -i "s|^dockerhub_base=ansible|#dockerhub_base=ansible|g" installer/inventory
mkdir -p /opt/awx-psql-data
sed -i "s|^postgres_data_dir.*|postgres_data_dir=/opt/awx-psql-data|g" installer/inventory

mkdir -p /etc/awx-ssl/
openssl req -subj '/CN=secops.tech/O=Secops Tech/C=TR' -new -newkey rsa:2048 -sha256 -days 1365 -nodes -x509 -keyout /etc/awx-ssl/awx.key -out /etc/awx-ssl//awx.crt
cat /etc/awx-ssl/awx.key /etc/awx-ssl/awx.crt > /etc/awx-ssl/awx-bundled-key.crt
sed -i -E "s|^#([[:space:]]?)ssl_certificate=|ssl_certificate=/etc/awx-ssl/awx-bundled-key.crt|g" installer/inventory

cd ~
curl -L -o awx-logos.tar.gz https://github.com/ansible/awx-logos/archive/master.tar.gz
tar xvfz awx-logos.tar.gz
mv awx-logos-master awx-logos
rm -f *awx*.tar.gz

cd ~/awx-$LATEST_AWX
sed -i -E "s|^#([[:space:]]?)awx_official=false|awx_official=true|g" installer/inventory

sed -i "s|^admin_user=.*|admin_user=$AWX_USER|g" installer/inventory ## USUARIO
sed -i "s|^admin_password=.*|admin_password=$AWX_PASSWORD|g" installer/inventory ## SENHA
# sed -i -E "s|^#([[:space:]]?)admin_password=.*|admin_password=$AWX_PASSWORD|g" installer/inventory ## SENHA

echo " "
echo "========================== AWX - INSTALLATION"
cd ~/awx-$LATEST_AWX/installer
/usr/local/bin/ansible-playbook -i inventory install.yml

echo " "
echo "========================== AWX - DOCKER-COMPOSE DOWN"
cd ~/.awx/awxcompose
docker-compose down
sleep 5

echo " "
echo "========================== AWX - DOCKER-COMPOSE UP"
docker-compose up -d
echo " "

