USER=$1
PASSWORD=$2

echo " "
echo "############## CREATE USER ($USER)"
adduser $USER
echo $PASSWORD | passwd --stdin $USER
echo "$USER        ALL=(ALL)       NOPASSWD: ALL" >> /etc/sudoers

echo " "
echo "############## MODIFY ROOT PASSWORD"
sudo echo $PASSWORD | passwd --stdin root

echo " "
echo "############## CONFIGURE SSH"
sed -i '/PasswordAuthentication yes/s/^#//g' /etc/ssh/sshd_config #(to uncomment)
sed -i '/PasswordAuthentication no/s/^/#/g' /etc/ssh/sshd_config #(to comment out)
sed -i '/PasswordAuthentication yes/s/^#//g' /etc/ssh/ssh_config #(to uncomment)

echo " "
echo "############## INSTALL BASIC PACKAGES"
yum install -y tree net-tools epel-release apt-utils yum-utils device-mapper-persistent-data lvm2 curl wget sshpass vim traceroute

echo " "
echo "############## UPDATE/UPGRADE REPOSITORY"
yum -y update && yum -y upgrade
echo " "