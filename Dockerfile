FROM sonarqube:latest
EXPOSE 9000
EXPOSE 9092
#ENV SONARQUBE_HOME="/opt/sonarqube"
#RUN cd ${SONARQUBE_HOME}/extensions/plugins/
USER root
RUN apk update
RUN apk add --update nodejs npm
RUN node -v
RUN npm -v
ENV SONARQUBE_HOME=/opt/sonarqube
RUN cd  $SONARQUBE_HOME/extensions/plugins/
RUN wget -P /opt/sonarqube/extensions/plugins https://github.com/dependency-check/dependency-check-sonar-plugin/releases/download/2.0.6/sonar-dependency-check-plugin-2.0.6.jar
RUN wget -P /opt/sonarqube/extensions/plugins https://github.com/cnescatlab/sonar-cnes-report/releases/download/3.2.2/sonar-cnes-report-3.2.2.jar
USER sonarqube