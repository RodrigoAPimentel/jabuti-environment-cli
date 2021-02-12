echo " "
echo "========================== INSTALLING --> OPENSHIFT CLI"
wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz
tar xvf openshift-origin-client-tools*.tar.gz
cd openshift-origin-client*/
sudo mv  oc kubectl  /usr/local/bin/

oc Completion bash> oc_bash_completion
sudo cp oc_bash_completion /etc/bash_completion.d/