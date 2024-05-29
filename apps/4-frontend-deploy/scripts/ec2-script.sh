echo "Starting " > /home/ubuntu/initial_setup.txt

#
# Writes logging messages to the log file
#
logging() {
    echo `date "+%F %T"` - $1 >> /home/ubuntu/logs/initial_setup.txt
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

    logging "Starting - create_script_to_upgrade_server"

    echo "#!/bin/bash" > $upgradeScript
    echo "" >> $upgradeScript
    echo "logging() {" >> $upgradeScript
    echo "    echo \`date \"+%F %T\"\` - \$1 >> /home/ubuntu/logs/upgrade_server.txt" >> $upgradeScript
    echo "}" >> $upgradeScript
    echo "" >> $upgradeScript
    echo "logging \"Starting ...\"" >> $upgradeScript
    echo "logging \"Starting update\"" >> $upgradeScript
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
    echo "logging \"Finished ...\"" >> $upgradeScript

    chown ubuntu:ubuntu $upgradeScript
    chmod 755 $upgradeScript

    logging "Finishing - create_script_to_upgrade_server"
    logging ""
}

# 
# Create the nginx config file for the domain. We then run the certbot to create the encryption, this 
# will change the file to add the encryption details.
#
create_nginx_conf_file() {
    logging "Starting - create_nginx_conf_file"

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
    echo "logging \"Running nginx config\"" >> $nodeScript
    echo "<<NGINX_CONF_FILES>>" >> $nginxConfScript
    echo "" >> $nginxConfScript

    echo "logging \"Complete\"" >> $nodeScript
    logging "Creating nginx conf file 4"

    chown ubuntu:ubuntu $nginxConfScript
    chmod 755 $nginxConfScript

    logging "Finishing - create_nginx_conf_file"
    logging ""

}

# 
# 
#
update_bashrc_files() {

    logging "Starting - update_bashrc_files"

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

    logging "Finishing - update_bashrc_files"
    logging ""
}

# 
# 
#
run_certbot_files() {

    logging "Starting - run_certbot_files"
    nodeScript="/home/ubuntu/scripts/certbot_setup.sh"

    echo "#!/bin/bash" > $nodeScript
    logging "Creating certbot records"

    echo "" >> $nodeScript
    echo "<<CERTBOT_CONF>>" >> $nodeScript
    echo "" >> $nodeScript
    echo "logging \"Restart nginx server\"" >> $nodeScript
    echo "systemctl restart nginx >> /home/ubuntu/logs/restart_nginx.log 2>&1" >> $nodeScript

    logging "Finishing - run_certbot_files"
    logging ""

    chown ubuntu:ubuntu $nodeScript
    chmod 755 $nodeScript
}


# 
# 
#
create_install_node_script() {

    nodeScript="/home/ubuntu/scripts/install_node.sh"
    logging "Starting - create_install_node_script"

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

    echo "logging \"Install certbot\"" >> $nodeScript
    echo "apt install certbot python3-certbot-nginx -y" >>  $nodeScript
    echo "" >> $nodeScript

#    echo "<<CERTBOT_CONF>>" >> $nodeScript
#    echo "" >> $nodeScript
#     echo "logging \"Restart nginx server\"" >> $nodeScript
#     echo "systemctl restart nginx >> /home/ubuntu/hello.txt 2>&1" >> $nodeScript

    chown ubuntu:ubuntu $nodeScript
    chmod 755 $nodeScript


    logging "Finishing - create_install_node_script"
    logging ""
}

#
create_deploy_website_script() {

    logging "Starting - create_deploy_website_script"
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

    # Clone the repository
    echo "logging \"Clone <<PROJECT_PREFIX>>\"" >> $deployWebsite
    # echo "git clone https://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@github.com/ShareMyWebStuff/tutorseekers.co.uk.git <<PROJECT_PREFIX>>_tmp" >> $deployWebsite
    echo "git clone https://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@github.com/ShareMyWebStuff/tutorseekers-mono.git <<PROJECT_PREFIX>>_tmp" >> $deployWebsite

    # Change in to the directory
    echo "cd <<PROJECT_PREFIX>>_tmp/" >> $deployWebsite
    echo "" >> $deployWebsite

    echo "logging \"Install packages\"" >> $deployWebsite
    echo "yarn" >> $deployWebsite
    echo "logging \"Focus frontend\"" >> $deployWebsite
    echo "yarn workspaces focus @tutorseekers/frontend" >> $deployWebsite
    echo "logging \"Building\"" >> $deployWebsite
    echo "yarn frontend:build" >> $deployWebsite
    echo "" >> $deployWebsite

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

    echo "logging \"Completed\"" >> $deployWebsite

    chown ubuntu:ubuntu $deployWebsite
    chmod 755 $deployWebsite
    logging "Finishing - create_deploy_website_script"
    logging ""
}

setup_pm2_script() {

    logging "Starting - Setup PM2"
    setupPM2="/home/ubuntu/scripts/setup_pm2.sh"

    echo "#!/bin/bash" > $setupPM2
    echo "" >> $setupPM2
    echo "logging() {" >> $setupPM2
    echo "    echo \`date \"+%F %T\"\` - \$1 >> /home/ubuntu/logs/setup_pm2.txt" >> $setupPM2
    echo "}" >> $setupPM2
    echo "" >> $setupPM2

    echo "logging \"Install PM2\"" >> $setupPM2
    echo "npm install pm2@latest -g" >> $setupPM2
    echo "pm2 update" >> $setupPM2
    echo "" >> $setupPM2

    # Change in to the directory
    echo "cd /home/ubuntu/<<PROJECT_PREFIX>>/" >> $setupPM2
    echo "" >> $setupPM2
    # echo "yarn frontend:build" >> $setupPM2

    echo "logging \"PM2 - Deleting\"" >> $setupPM2
    echo "pm2 delete all" >> $setupPM2
    echo "logging \"PM2 - Startup\"" >> $setupPM2
    echo "pm2 startup -u root >> /home/ubuntu/logs/setup_pm2.txt" >> $setupPM2
    # echo "pm2 startup systemd >> /home/ubuntu/logs/deploy_website.txt" >> $setupPM2
    
    # pm2 start yarn --name tutorseekers-uk -- frontend:start
    echo "logging \"PM2 - Start\"" >> $setupPM2
    # echo "pm2 start yarn --name <<APP_NAME>> -- frontend:start &>/dev/null" >> $setupPM2

    echo "cd apps/frontend" >> $setupPM2
    echo "pm2 start yarn --name <<APP_NAME>> -- start &>/dev/null" >> $setupPM2


    # echo "pm2 start npm --name <<APP_NAME>> -- start &>/dev/null" >> $setupPM2
    echo "logging \"PM2 - List\"" >> $setupPM2
    echo "pm2 ls" >> $setupPM2
    echo "logging \"PM2 - Save\"" >> $setupPM2
    echo "pm2 save" >> $setupPM2

    # Sleep 10 seconds to give the processes time to start
    echo "sleep 10" >> $setupPM2

    echo "logging \"Restart nginx server\"" >> $setupPM2
    echo "systemctl restart nginx >> /home/ubuntu/hello.txt 2>&1" >> $setupPM2


    echo "logging \"PM2 Completed\"" >> $setupPM2

    chown root:root $setupPM2
    chmod 755 $setupPM2
    logging "Finishing - Setup PM2"
}

restart_nginx_script() {

    logging "Starting - Restart nginx"
    setupPM2="/home/ubuntu/scripts/restart_nginx_script.sh"

    echo "#!/bin/bash" > $setupPM2
    echo "" >> $setupPM2
    echo "logging() {" >> $setupPM2
    echo "    echo \`date \"+%F %T\"\` - \$1 >> /home/ubuntu/logs/restart_nginx_script.txt" >> $setupPM2
    echo "}" >> $setupPM2
    echo "" >> $setupPM2

    echo "logging \"Restart nginx server\"" >> $setupPM2
    echo "systemctl restart nginx >> /home/ubuntu/logs/restart_nginx_script.txt 2>&1" >> $setupPM2


    echo "logging \"Restart nginx Completed\"" >> $setupPM2

    chown root:root $setupPM2
    chmod 755 $setupPM2
    logging "Finishing - Restart nginx"
}


create_scripts_directory

create_script_to_upgrade_server

create_nginx_conf_file

update_bashrc_files

create_install_node_script

run_certbot_files

create_deploy_website_script

setup_pm2_script

restart_nginx_script

. /home/ubuntu/scripts/upgrade_server.sh

. /home/ubuntu/scripts/create_nginx_conf.sh

. /home/ubuntu/scripts/install_node.sh

. /home/ubuntu/scripts/deploy_website.sh

. /home/ubuntu/scripts/setup_pm2.sh

. /home/ubuntu/scripts/restart_nginx_script.sh



cat <<EOF >> /home/ubuntu/.bashrc
export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
EOF
