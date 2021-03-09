FROM selenium/node-chrome-debug:3.14.0-beryllium
#https://github.com/SeleniumHQ/docker-selenium/releases

LABEL authors=CA-Automation

#====================================
# Scripts to run Selenium Standalone
#====================================

RUN sudo apt-get update \
    && sudo apt-get install curl -y \
    && curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - \
    && sudo apt-get install -y nodejs \
    && sudo npm i npm@latest -g

ENV NPM_CONFIG_LOGLEVEL=WARN

COPY jenkins/scripts/entry_point.sh /opt/bin/entry_point.sh
RUN sudo chmod +x /opt/bin/entry_point.sh

EXPOSE 4444
EXPOSE 5900

COPY . /protractor/
WORKDIR /protractor/

RUN sudo chown seluser:seluser /protractor -R
RUN npm install
RUN sudo npm install -g protractor
RUN sudo npm install -g allure-commandline
RUN sudo webdriver-manager update

ENTRYPOINT ["/opt/bin/entry_point.sh"]
