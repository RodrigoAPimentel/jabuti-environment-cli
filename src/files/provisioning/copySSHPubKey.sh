SSH_PUBLIC_KEY=$4

echo " "
echo "========================== COPYING SSH PUBLIC KEY"
echo "Creating .ssh folder ......"
sudo mkdir -p ~/.ssh
echo "Creating the authorized_keys file inside the .ssh folder ......"
echo "SSH Public Key: $SSH_PUBLIC_KEY"
echo $SSH_PUBLIC_KEY >> ~/.ssh/authorized_keys
echo "Copying the SSH Public Key to the authorized_keys file ......"
echo "Modifying permissions ......"
sudo chmod -R go= ~/.ssh
echo ">>>> Public key SSH configured with SUCCESS."
echo " "