# Demo CSV

Aplicação que analisa dados de empresas que estão disponíveis arquivos no formato csv.

## Pré-requesitos

Você precisa de um servidor mysql instalado e configurar um usuário apropriado para executar o projeto. Também é preciso ter o nodejs instalado.

### Instalando e Configurando o MYSQL no Linux (Debian-based)

Instale o MYSQL:

```shell
sudo apt install mysql-server
```

Inicie o servidor do MYSQL:

```shell
sudo /etc/init.d/mysql start
```

Logo depois de iniciar o servidor do MySQL, execute os prompts de segurança do mysql, basta digita o comando:

```shell
sudo mysql_secure_installation
```

Faça login como root e adicione um usuário:

```shell
sudo mysql -u root -p
```

```shell
$ mysql -uroot
mysql> CREATE USER '<username>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>';
```

Após criar o usuário preencha o <'username'> e o <'password'> no arquivo [database.js](https://github.com/XatubaPox/demo-csv/blob/main/database/database.js).

Conceda privilégios para esse usuário (pode conceder menos privilégios se quiser):


```shell
mysql> GRANT ALL PRIVILEGES ON *.* TO '<username>'@'localhost' WITH GRANT OPTION;
```

Saia do usuário root, logue com o usuário que acabou de criar, e crie um banco de dados com o script disponivel no arquivo [democsv.sql](https://github.com/XatubaPox/demo-csv/blob/main/database/democsv.sql):

```shell
mysql> quit
$ mysql -u <username> -p
Enter password: ***
mysql> CREATE DATABASE democsv...
```

## Instalando dependências do projeto

```shell
$ npm i
```

## Rodando o projeto

```shell
$ node app.js
```




