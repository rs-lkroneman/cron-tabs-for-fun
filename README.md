# Crontabs + Cowsay + Emails

A repository for automating emails from your gmail acount using

- cowsay
- node
- nodemailer
- crontab
- a bash script

## Quickstart (short version)

```
bin/setup quickstart
```

update ./.env with your credentials by following [generate-application-password-for-gmail](https://lmgtfy.app/?q=how+to+generate+application+specific+password+for+gmail)

### Install Dependencies

1. Cowsay

(MacOS)
```sh
brew install cowsay
```

2. Node & Yarn

- [with brew](https://formulae.brew.sh/formula/node)
- [asdf](http://asdf-vm.com/)
    - [node with asdf](https://github.com/asdf-vm/asdf-nodejs)
- [directly](https://nodejs.org/en/download/)
- [with nvm](https://github.com/nvm-sh/nvm#install--update-script)

3. Node Dependencies
```bash
cd src && yarn install && cd ..
```

### Add a recipients list

1. The script below will start the list with the recipients who will receive your email, this defaults to your git username and password

```bash
bin/setup recipients
```

### Update your credentials

The email script uses dotenv to grab credentials, this way it's not in your environment and the cron user will stil have access without running the script as you

```bash
bin/setup env
```

once the file is set up open ./.env and update your email and credentials

### Create a executable for crontab to run as an executable

1. Create the script

```sh
bin/setup recipients
```

###  Help Text
1. setup script help text

```bash
bin/setup recipients    - creates a initial recipients list file as a sample
bin/setup env           - creates a .env file as a sample
bin/setup script [name] - creates a cron script from template to run the email

bin/setup clear         - clears crontabs
bin/setup show          - shows configured crontabs
bin/setup day           - creates a sample day cron tab with an executable script
bin/setup minute        - creates a sample minute cron tab with an executable script
```

