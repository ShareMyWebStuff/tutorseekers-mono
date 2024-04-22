echo "Starting " > /home/ubuntu/hello.txt

#
# Writes logging messages to the log file
#
logging() {
    echo `date "+%F %T"` - $1 >> /home/ubuntu/logs/hello.txt
}

#
# Create scripts directory
#
create_scripts_directory() {
    mkdir /home/ubuntu/scripts
    chown ubuntu:ubuntu /home/ubuntu/scripts

    mkdir /home/ubuntu/logs
    chown ubuntu:ubuntu /home/ubuntu/logs
}

#
# Create script to upgrade the server
#
create_script_to_upgrade_server() {

    upgradeScript="/home/ubuntu/scripts/upgrade_server.sh"

    logging "Create script to upgrade server"

    echo "#!/bin/bash" > $upgradeScript
    echo "" >> $upgradeScript
    echo "logging() {" >> $upgradeScript
    echo "    echo \`date \"+%F %T\"\` - \$1 >> /home/ubuntu/logs/upgrade_server.txt" >> $upgradeScript
    echo "}" >> $upgradeScript
    echo "" >> $upgradeScript
    echo "logging \"Starting update\"" >> $upgradeScript
    echo "whoami > /home/ubuntu/logs/whoami.txt" >> $upgradeScript
    echo "apt-get update -y" >>  $upgradeScript
    echo "logging \"Starting upgrade\"" >> $upgradeScript
    echo "apt-get upgrade -y" >> $upgradeScript
    echo "logging \"Installing nginx\"" >> $upgradeScript
    echo "apt install nginx -y" >> $upgradeScript
    echo "logging \"Starting nginx\"" >> $upgradeScript
    echo "systemctl start nginx" >> $upgradeScript
    echo "logging \"Enable nginx\"" >> $upgradeScript
    echo "systemctl enable nginx" >> $upgradeScript
    echo "logging \"Upgrade complete\"" >> $upgradeScript

    chown ubuntu:ubuntu $upgradeScript
    chmod 755 $upgradeScript

    logging "Completed creating script"
}

# 
# Create the nginx config file for the domain. We then run the certbot to create the encryption, this 
# will change the file to add the encryption details.
#
create_nginx_conf_file() {
    logging "Creating nginx conf file"

    logging "Create script to upgrade server"

    nginxConfScript="/home/ubuntu/scripts/create_nginx_conf.sh"

    logging "Creating nginx conf file1"

    echo "#!/bin/bash" > $nginxConfScript
    logging "Creating nginx conf file 2"

    echo "" >> $nginxConfScript

    logging "Creating nginx conf file 3"

    echo "logging() {" >> $nginxConfScript
    echo "    echo \`date \"+%F %T\"\` - \$1 >> /home/ubuntu/logs/create_nginx_conf.txt" >> $nginxConfScript
    echo "}" >> $nginxConfScript
    echo "" >> $nginxConfScript

    echo "#" >> $nginxConfScript
    echo "# Function Name: create_nginx_conf" >> $nginxConfScript
    echo "# " >> $nginxConfScript
    echo "# Description  : This function creates a nginx config file for ach of the specified domain names" >> $nginxConfScript
    echo "# " >> $nginxConfScript
    echo "# Params" >> $nginxConfScript
    echo "#   ip address" >> $nginxConfScript
    echo "#   domain name" >> $nginxConfScript
    echo "# " >> $nginxConfScript
    echo "" >> $nginxConfScript

    echo "create_nginx_conf() {" >> $nginxConfScript
    echo "" >> $nginxConfScript
    echo "  nginxFilename=\"/etc/nginx/sites-available/\$2\"" >> $nginxConfScript
    echo "  rm /etc/nginx/sites-enabled/\$2 &>/dev/null" >> $nginxConfScript
    echo "  rm \$nginxFilename &>/dev/null" >> $nginxConfScript
    echo "" >> $nginxConfScript
    echo "  echo \"server {\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"  client_max_body_size 64M;\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"  listen 80;\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"  server_name www.\$2 \$2 \$1;\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"  location / {\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"      proxy_pass             http://127.0.0.1:3000;\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"      proxy_read_timeout     60;\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"      proxy_connect_timeout  60;\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"      proxy_redirect         off;\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"      # Allow the use of websockets\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"      proxy_http_version 1.1;\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"      proxy_set_header Upgrade \\\$http_upgrade;\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"      proxy_set_header Connection 'upgrade';\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"      proxy_set_header Host \\\$host;\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"      proxy_cache_bypass \\\$http_upgrade;\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"  }\" >> \$nginxFilename" >> $nginxConfScript
    echo "  echo \"}\" >> \$nginxFilename" >> $nginxConfScript
    echo "  ln -s \$nginxFilename /etc/nginx/sites-enabled/" >> $nginxConfScript
    echo "}" >> $nginxConfScript

    echo "" >> $nginxConfScript
    echo "#" >> $nginxConfScript
    echo "# Create the following nginx config files" >> $nginxConfScript
    echo "#" >> $nginxConfScript
    echo "<<NGINX_CONF_FILES>>" >> $nginxConfScript
    echo "" >> $nginxConfScript

    logging "Creating nginx conf file 4"

    chown ubuntu:ubuntu $nginxConfScript
    chmod 755 $nginxConfScript

}

# 
# 
#
update_bashrc_files() {

    logging "Setting root bashrc"

    touch ~/.bash_profile

    export XDG_CONFIG_HOME="/home/ubuntu"
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

    echo "export XDG_CONFIG_HOME=$XDG_CONFIG_HOME" >> /root/.bashrc
    echo "export NVM_DIR=$NVM_DIR" >> /root/.bashrc
    echo ". $NVM_DIR/nvm.sh" >> /root/.bashrc

    logging "Setting ubuntu bashrc"
    echo "export XDG_CONFIG_HOME=$XDG_CONFIG_HOME" >> /home/ubuntu/.bashrc
    echo "export NVM_DIR=$NVM_DIR" >> /home/ubuntu/.bashrc
    echo ". $NVM_DIR/nvm.sh" >> /home/ubuntu/.bashrc

    logging "Completed updating root bashrc"
}

# 
# 
#
create_install_node_script() {

    nodeScript="/home/ubuntu/scripts/install_node.sh"
    logging "Create script to install node"

    echo "#!/bin/bash" > $nodeScript
    logging "Create script to install node 1"
    echo "" >> $nodeScript
    echo "logging() {" >> $nodeScript
    echo "    echo \`date \"+%F %T\"\` - \$1 >> /home/ubuntu/logs/install_node.txt" >> $nodeScript
    echo "}" >> $nodeScript
    echo "" >> $nodeScript
    logging "Create script to install node 2"
    echo "logging \"Starting node installation\"" >> $nodeScript
    echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash" >>  $nodeScript
    logging "Create script to install node 3"
    echo "" >> $nodeScript
    logging "Create script to install node 4"

    echo "chown ubuntu:ubuntu $NVM_DIR && chmod a+x $NVM_DIR" >> $nodeScript
    logging "Create script to install node 5"
    echo "logging \"Run nmv shell\"" >> $nodeScript
    echo ". $NVM_DIR/nvm.sh" >> $nodeScript
    logging "Create script to install node 6"
    echo "" >> $nodeScript
    logging "Create script to install node 7"

    echo "logging \"Installing node 18\"" >> $nodeScript
    echo "nvm install 20" >> $nodeScript
    logging "Create script to install node 8"
    echo "" >> $nodeScript
    logging "Create script to install node 9"

    echo "logging \"Use node 20\"" >> $nodeScript
    echo "nvm use 20" >> $nodeScript
    logging "Create script to install node 20"
    echo "" >> $nodeScript

    echo "logging \"Install yarn\"" >> $nodeScript
    echo "npm install -g corepack" >> $nodeScript
    echo "corepack enable" >> $nodeScript
    echo "corepack prepare yarn@stable --activate" >> $nodeScript
    echo "" >> $nodeScript


    echo "logging \"Install PM2\"" >> $nodeScript
    echo "npm i pm2 -g" >> $nodeScript
    echo "pm2 update" >> $nodeScript
    echo "" >> $nodeScript

    echo "logging \"Install certbot\"" >> $nodeScript
    echo "apt install certbot python3-certbot-nginx -y" >>  $nodeScript
    echo "" >> $nodeScript

    echo "<<CERTBOT_CONF>>" >> $nodeScript
    echo "" >> $nodeScript
    echo "logging \"Restart nginx server\"" >> $nodeScript
    echo "systemctl restart nginx >> /home/ubuntu/hello.txt 2>\&1" >> $nodeScript

    chown ubuntu:ubuntu $nodeScript
    chmod 755 $nodeScript


    logging "Completed node installation"
}

#
create_deploy_website_script() {

    logging "Completed node installation"
    deployWebsite="/home/ubuntu/scripts/deploy_website.sh"

    logging "Clone <<PROJECT_PREFIX>>"
    echo "#!/bin/bash" > $deployWebsite
    echo "" >> $deployWebsite
    echo "logging() {" >> $deployWebsite
    echo "    echo \`date \"+%F %T\"\` - \$1 >> /home/ubuntu/logs/deploy_website.txt" >> $deployWebsite
    echo "}" >> $deployWebsite
    echo "" >> $deployWebsite
    echo "cd /home/ubuntu" >> $deployWebsite
    echo "" >> $deployWebsite

    echo "logging \"Install PM2\"" >> $nodeScript
    echo "npm i pm2 -g" >> $nodeScript
    echo "pm2 update" >> $nodeScript
    echo "" >> $nodeScript

    # Clone the repository
    echo "logging \"Clone <<PROJECT_PREFIX>>\"" >> $deployWebsite
    # echo "git clone https://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@github.com/ShareMyWebStuff/tutorseekers.co.uk.git <<PROJECT_PREFIX>>_tmp" >> $deployWebsite
    echo "git clone https://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@github.com/ShareMyWebStuff/tutorseekers-mono.git <<PROJECT_PREFIX>>_tmp" >> $deployWebsite
# https://github.com/ShareMyWebStuff/tutorseekers-mono.git
# Fine grain token - https://github.com/settings/personal-access-tokens/973258
# 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

    # Change in to the directory
    echo "cd <<PROJECT_PREFIX>>_tmp/" >> $deployWebsite
    echo "" >> $deployWebsite

# yarn
# yarn workspaces focus @tutorseekers/frontend
# cd apps/frontend
# yarn build
    echo "logging \"Install packages\"" >> $deployWebsite
    echo "yarn" >> $deployWebsite
    echo "logging \"Focus frontend\"" >> $deployWebsite
    echo "yarn workspaces focus @tutorseekers/frontend" >> $deployWebsite
    echo "logging \"Building\"" >> $deployWebsite
    echo "yarn frontend:build" >> $deployWebsite
    echo "" >> $deployWebsite





    # Install the node modules
    # echo "logging \"Run npm install\"" >> $deployWebsite
    # echo "npm install" >> $deployWebsite
    # echo "" >> $deployWebsite

    # # Build the project
    # echo "logging \"Run npm build\"" >> $deployWebsite
    # echo "npm run build" >> $deployWebsite
    # echo "" >> $deployWebsite

    # Change in to the home directory
    echo "cd /home/ubuntu" >> $deployWebsite
    echo "" >> $deployWebsite

    # Remove the existing project
    echo "logging \"Remove <<PROJECT_PREFIX>>\"" >> $deployWebsite
    echo "rm -rf <<PROJECT_PREFIX>>/" >> $deployWebsite
    echo "" >> $deployWebsite

    # Rename the tmp directory to the project directory
    echo "logging \"Rename <<PROJECT_PREFIX>>_tmp\"" >> $deployWebsite
    echo "mv <<PROJECT_PREFIX>>_tmp <<PROJECT_PREFIX>>" >> $deployWebsite
    echo "" >> $deployWebsite

    # Change in to the directory
    echo "cd <<PROJECT_PREFIX>>/" >> $deployWebsite
    echo "" >> $deployWebsite

    # Restart pm2
    echo "logging \"whoami\"" >> $deployWebsite
    echo "pm2 delete all" >> $deployWebsite
    # echo "pm2 startup >> /home/ubuntu/logs/deploy_website.txt" >> $deployWebsite
    echo "pm2 startup systemd >> /home/ubuntu/logs/deploy_website.txt" >> $deployWebsite
    
    # pm2 start yarn --name tutorseekers-uk -- frontend:start
    echo "pm2 start yarn --name <<APP_NAME>> -- frontend:start &>/dev/null" >> $deployWebsite
    # echo "pm2 start npm --name <<APP_NAME>> -- start &>/dev/null" >> $deployWebsite
    echo "pm2 ls" >> $deployWebsite
    echo "pm2 save" >> $deployWebsite

    # Sleep 10 seconds to give the processes time to start
    echo "sleep 10" >> $deployWebsite


    # echo "logging \"Remove <<PROJECT_PREFIX>>\"" >> $deployWebsite
    # echo "rm -rf <<PROJECT_PREFIX>>/" >> $deployWebsite
    # echo "" >> $deployWebsite
    # echo "logging \"Clone <<PROJECT_PREFIX>>\"" >> $deployWebsite
    # echo "git clone https://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@github.com/ShareMyWebStuff/tutorseekers.co.uk.git <<PROJECT_PREFIX>>" >> $deployWebsite
    # echo "" >> $deployWebsite
    # echo "cd <<PROJECT_PREFIX>>/" >> $deployWebsite
    # echo "" >> $deployWebsite
    # echo "logging \"Run npm install\"" >> $deployWebsite
    # echo "npm install" >> $deployWebsite
    # echo "" >> $deployWebsite
    # echo "logging \"Run npm build\"" >> $deployWebsite
    # echo "npm run build" >> $deployWebsite
    # echo "" >> $deployWebsite
    # echo "logging \"Run PM2 start\"" >> $deployWebsite
    # echo "pm2 startup >> /home/ubuntu/logs/deploy_website.txt" >> $deployWebsite
    # echo "pm2 start npm --name <<APP_NAME>> -- start &>/dev/null" >> $deployWebsite
    # echo "pm2 save" >> $deployWebsite
    # # # echo "nohup pm2 start npm --name <<APP_NAME>> &>/dev/null &" >> $deployWebsite
    # # # echo "nohup pm2 start npm --name <<APP_NAME>> -- start &>/dev/null &" >> $deployWebsite
    # # echo "sleep 1" >> $deployWebsite
    # # echo "pm2 status >> /home/ubuntu/logs/deploy_website.txt" >> $deployWebsite
    # echo "" >> $deployWebsite
    echo "logging \"Completed\"" >> $deployWebsite

    chown ubuntu:ubuntu $deployWebsite
    chmod 755 $deployWebsite
}

create_scripts_directory

create_script_to_upgrade_server

create_nginx_conf_file

update_bashrc_files

create_install_node_script

create_deploy_website_script

. /home/ubuntu/scripts/upgrade_server.sh

. /home/ubuntu/scripts/create_nginx_conf.sh

. /home/ubuntu/scripts/install_node.sh

. /home/ubuntu/scripts/deploy_website.sh

# . /home/ubuntu/scripts/deploy_website.sh
