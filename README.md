# **Jabuti Environment CLI (JEC)**

![Version](https://img.shields.io/github/package-json/v/RodrigoAPimentel/jabuti-environment-cli)
![NPM Version](https://img.shields.io/npm/v/jabuti-environment-cli)
![Tag Version](https://img.shields.io/github/v/tag/RodrigoAPimentel/jabuti-environment-cli)
![NPM Downloads](https://img.shields.io/npm/dm/jabuti-environment-cli.svg?style=flat)
![Install Size](https://packagephobia.now.sh/badge?p=jabuti-environment-cli)
![Github All Contributors](https://img.shields.io/github/contributors/RodrigoAPimentel/jabuti-environment-cli)
![GitHub last commit (master)](https://img.shields.io/github/last-commit/RodrigoAPimentel/jabuti-environment-cli/master)
![Language](https://img.shields.io/github/languages/count/RodrigoAPimentel/jabuti-environment-cli)
![Top Language](https://img.shields.io/github/languages/top/RodrigoAPimentel/jabuti-environment-cli)
![Pull Request](https://img.shields.io/github/issues-pr/RodrigoAPimentel/jabuti-environment-cli)
![License](https://img.shields.io/npm/l/jabuti-environment-cli)
![Commit Activity](https://img.shields.io/github/commit-activity/m/RodrigoAPimentel/jabuti-environment-cli)

Aplicação para criação de ambiente de forma rápida e eficiente. Em poucos clicks você consegue criar uma Máquina Virtual com todos os softwares básicos, configuração de SSH e portas necessárias a sua demanda, além de criar também algumas Ferramenta de DevOps.

-   [Requisitos](#Requisitos)
-   [Instalação](#Instalação)
    -   [Rápida](#Rápida)
    -   [Clonando Repositório](#Clonando-Repositório)
-   [Uso](#Uso)
    -   [Mode of Operation](#Mode-of-Operation)
        -   [Create Virtual Machine](#Create-Virtual-Machine)
        -   [Create Virtual Machine with TOOL](#Create-Virtual-Machine-with-TOOL)
    -   [Informações Finais do Provisionamento](#Informações-Finais-do-Provisionamento)
-   [Problemas e Alertas](#Problemas-e-Alertas)
    -   [Requisitos básicos não instalados](#Requisitos-básicos-não-instalados)
    -   [Requisitos básicos com versões inferiores a recomendadas](#Requisitos-básicos-com-versões-inferiores-a-recomendadas)
    -   [Atualização do JEC](#Atualização-do-JEC)

---

## **Requisitos**

-   _Windows 10_
-   _Node >= v14.11.0_
-   _Vagrant >= v2.2.7_
-   _Virtual Box >= v6.0_

---

## **Instalação**

> #### **_P.S: Todos as informações são para Windows._**

> #### **_P.S: Para ambas as instalações incluir na variável PATH o caminho da pasta do VirtualBox._**

### **- Rápida**

-   No Powershell executar o comando **_npm_**:

```
npm install -g jabuti-environment-cli
```

### **- Clonando Repositório**

1. _Clonar o repositório do JEC para sua máquina;_
2. _Criar Variável de Ambiente **JEC_HOME** apontando para a pasta onde a aplicação foi clonada;_
3. _Executar o comando **"npm link"** na pasta onde a aplicação foi clonada._

---

## **Uso**

> #### **_P.S: Instrução para utilização do JEC no Powershell. Recomendamos a utilização do mesmo._**

1. _Utilizar em modo **administrador**;_
1. _Ativar a execução de script's externos:_

```
set-executionpolicy unrestricted
```

2. _Iniciar a aplicação com o comando ***"jec"***._

![](/assets/logo.png)

### **Mode of Operation:**

#### **_Create Virtual Machine_**

Cria uma Máquina Virtual com configurações definidas no Wizard.

![](/assets/CreateVirtualMachine.png)

-   **Enter the NAME of the Virtual Machine:**
    -   _**Default:** Virtual-Machine-1;_
    -   _Informe o nome da Máquina Virtual que será exposto na Virtual Box e também será o hostname._
-   **Enter the PUBLIC IP of the Virtual Machine:**
    -   _**Default:** 192.168.100.123;_
    -   _Informe o IP fixo da Máquina Virtual._
-   **Enter the NUMBER OF CORES for the Virtual Machine:**
    -   _**Default:** 2;_
    -   _Informe a Quantidade de Cores de CPU reservados para Máquina Virtual._
-   **Enter the MEMORY RAM SIZE for the Virtual Machine (Mb):**
    -   _**Default:** 4096Mb (4Gb);_
    -   _Informe a Quantidade de Memória RAM reservada para a Máquina Virtual._
-   **Enter USER for Virtual Machine:**
    -   _**Default:** root;_
    -   _Informe o Usuário do Sistema Operacional da Máquina Virtual._
-   **Enter the PASSWORD for Virtual Machine [Default = toor]:**
    -   _**Default:** toor;_
    -   _Informe a Senha do Usuário do Sistema Operacional da Máquina Virtual._
-   **Do you want to copy the public SSH key to the Virtual Machine?**
    -   _**"Yes" ou "No"**_
    -   _Copia para a Máquina Virtual a chave SSH da pasta "/\<user\>/.ssh"._
-   **Do you want to change the terminal from Bash to Oh-My-ZSH on the Virtual Machine?**
    -   _**"Yes" ou "No"**_
    -   _Instala e configura o Terminal Oh-My-ZSH na Máquina Virtual._
-   **Select the programs to be installed:** _Selecione os programas a serem instalados no provisionamento da Máquina Virtual._
-   **Select the ports that became available:** _Selecione as portas a serem liberadas no provisionamento da Máquina Virtual._

#### **_Create Virtual Machine with TOOL_**

Cria uma Máquina Virtual com Ferramenta de DevOps.

![](/assets/CreateVirtualMachineTool.png)

-   **Ansible-AWX:** _Cria uma Maquina Virtual com o Ansible-AWX instalado e configurado, pronto para usar._
-   **Minishift-Windows:** _Cria uma um Cluster Minishift no Sistema Operacional do Host._

---

#### **Informações Finais do Provisionamento**

Ao finalizar o processo de Provisionamento é mostrado as Configurações da Máquina Criada.

-   Terminal:

    ![](/assets/configuracaoFinalTerminal.png)

-   Virtual Box:

    ![](/assets/configuracaoFinalVirtualBox.png)

---

## **Problemas e Alertas**

### **- _Requisitos básicos não instalados_**

![](/assets/basicRequirementNotInstalled.png)

-   É mostrado uma mensagem informando que há requisitos básicos que não estão instalados e a aplicação encerra. É necessário a instalação desses requisitos obrigatórios para o funcionamento:
    ![](/assets/basicRequirementNotInstalledMessage.png)

-   É mostrado mensagens de **_PROBLEM !!_** informando quais requisitos básicos não estão instalados:
    ![](/assets/basicRequirementNotInstalled.png)

---

### **- _Requisitos básicos com versões inferiores a recomendadas_**

-   É mostrado mensagens de **_WARNING !!_** informando quais requisitos estão com versões inferiores as recomendadas.
    ![](/assets/basicRequirementLowerVersion.png)

---

### **- _Atualização do JEC_**

-   Quando existir uma versão mais recente da aplicação no repositório **_npm_** será mostrado a mensagem abaixo e o comando necessário para atualizar:
    > #### **_P.S: Quando tiver instalado utilizando a versão "Rápida"._**
    >
    > #### **_P.S: Se tiver instalado utilizando a versão "Clonando Repositório" deverá ser feito o "Pull" do repositório._**
    >
    > ![](/assets/updateAvailable.png)
