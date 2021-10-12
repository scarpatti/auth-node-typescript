
FROM postgres:12-alpine

# COPY ./database/create.sql /docker-entrypoint-initdb.d/

# RUN ["sed", "-i", "s/exec \"$@\"/echo \"skipping...\"/", "/usr/local/bin/docker-entrypoint.sh"]

ENV PG_USER=postgres
ENV PGDATA=/data

RUN mkdir -p "$PGDATA"
RUN chown -R postgres "$PGDATA"
RUN chmod 700 "$PGDATA"

RUN mkdir -p /var/run/postgresql
RUN chown -R postgres /var/run/postgresql
RUN chmod 775 /var/run/postgresql

RUN mkdir -p /data/postgres
RUN chown -R postgres /data/postgres
RUN chmod 775 /data/postgres

# RUN ["/usr/local/bin/docker-entrypoint.sh", "postgres"]

# # final build stage
# FROM postgres:11-alpine

# COPY --from=dumper /data $PGDATA
