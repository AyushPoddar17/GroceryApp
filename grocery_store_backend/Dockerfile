# FROM mysql:latest 
# ENV MYSQL_DATABASE marvel
# COPY ./scripts/ /docker-entrypoint-initdb.d/

# cat Dockerfile
FROM mysql:latest

RUN chown -R mysql:root /var/lib/mysql/


ENV MYSQL_DATABASE "grocery"
ENV MYSQL_ROOT_PASSWORD "strong_password"

COPY database.sql /etc/mysql/data.sql
 
RUN sed -i 's/MYSQL_DATABASE/grocery/g' /etc/mysql/data.sql
RUN cp /etc/mysql/data.sql /docker-entrypoint-initdb.d

EXPOSE 3306