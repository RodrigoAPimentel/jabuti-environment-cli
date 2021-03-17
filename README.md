# **Jabuti Environment CLI (JEC)**

Aplicação para criação de ambiente de forma rapida e eficiente. Em poucos clicks você consegue subir uma Maquina Virtual com todos os softwares basicos, configuração de SSH e portas necessarias a sua demanda alem de subir tambem algumas Ferramenta de DevOps.
_______________
## **Requisitos**

- _Node >= v12_
- _Vagrant >= v2.2.7_
- _Virtual Box >= v6.0_
______________
## **Instalação**

- _Clonar o repositorio do JEC para sua maquina_
- _Criar a Variavel de Ambiente JEC_HOME apontando para a pasta aonde esta o JEC_
- _Rodar o comando ***"npm link"*** dentro da pasta do JEC_

> #### **_P.S: Todos as informações são para Windows._**
__________________________
## **Uso**

_No terminal de sua preferencia (Powershell, prompt e etc) usar o comando ***"jec"***._

![](/assets/logo.png)

### **Mode of Operation:**

#### **_Create Virtual Machine_**
Cria uma Maquina Virtual com configurações definidas no Wizard.

![](/assets/CreateVirtualMachine.png)

- **Enter the NAME of the Virtual Machine:** 
    - _**Default:** Virtual-Machine-1_
    - _Informe o nome da Maquina Virtual que será exposto na Virtual Box e tambem o hostname_
- **Enter the PUBLIC IP of the Virtual Machine:**
    - _**Default:** 192.168.100.123_
    - _Informe o IP fixo da Maquina Virtual_
- **Enter the NUMBER OF CORES for the Virtual Machine:**
    - _**Default:** 2_
    - _Informe a Quantidade de Cores de CPU reservados para Maquina Virtual_
- **Enter the MEMORY RAM SIZE for the Virtual Machine (Mb):**
    - _**Default:** 4096Mb (4Gb)_
    - _Informe a Quantidade de Memoria RAM reservada para a Maquina Virtual_
- **Enter USER for Virtual Machine:**
    - _**Default:** root_
    - _Informe o Usuario do Sistema Operacional da Maquina Virtual_
- **Enter the PASSWORD for Virtual Machine [Default = toor]:** 
    - _**Default:** toor_
    - _Informe a Senha do Usuario do Sistema Operacional da Maquina Virtual_
- **Do you want to copy the public SSH key to the Virtual Machine?**
    - _**"Yes" ou "No"**_
    - _Copia para a Maquina Virtual a chave SSH da pasta "/\<user\>/.ssh"_
- **Do you want to change the terminal from Bash to Oh-My-ZSH on the Virtual Machine?**
    - _**"Yes" ou "No"**_
    - _Instala e configura o Terminal Oh-My-ZSH na Maquina Virtual_
- **Select the programs to be installed:** _Selecione os programas a serem instalados no provisionamento da Maquina Virtual_
- **Select the ports that became available:** _Selecione as portas a serem liberadas no provisionamento da Maquina Virtual_

#### **_Create Virtual Machine with TOOL_**
Cria uma Maquina Virtual com Ferramentas de DevOps.
 
![](/assets/CreateVirtualMachineTool.png)

- **Ansible-AWX:** _Cria uma Maquina Virtual com o Ansible-AWX instalado e configurado, pronto para usar_
- **Minishift-Windows:** _Cria uma um Cluster Minishift no Sistema Operacional do Host_

------
#### **Informações Finais do Provisionamento**
Ao finalizar o processo de Provisionamento é mostrado as Configurações da Maquina Criada.
- Terminal:

    ![](/assets/configuracaoFinalTerminal.png)
- Virtual Box:

    ![](/assets/configuracaoFinalVirtualBox.png)
