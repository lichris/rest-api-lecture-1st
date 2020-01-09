FROM mysql:8.0

ADD my.cnf /etc/mysql/conf.d/my.cnf

RUN chown -R mysql:root /var/lib/mysql/

ARG MYSQL_DATABASE=db_1st
ARG MYSQL_USER=user
ARG MYSQL_PASSWORD=password
ARG MYSQL_ROOT_PASSWORD=password

ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD

CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_0900_ai_ci"]
EXPOSE 13306