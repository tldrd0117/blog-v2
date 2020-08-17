FROM mariadb

RUN apt update
RUN echo 'Y' | apt install mariadb-plugin-mroonga

ADD ./init-sql /docker-entrypoint-initdb.d