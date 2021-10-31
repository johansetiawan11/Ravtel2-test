CREATE DATABASE ravteldb_testing;
CREATE ROLE ravteldb_testing WITH LOGIN PASSWORD 'ravteldb';
GRANT ALL PRIVILEGES ON DATABASE ravteldb_testing TO ravteldb_testing;
