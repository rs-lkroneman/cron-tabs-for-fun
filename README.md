# Crontabs + Cowsay + Emails

## Setup

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

