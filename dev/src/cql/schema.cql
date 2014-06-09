CREATE KEYSPACE IF NOT EXISTS opensensors
       WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

USE opensensors;

DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS messages (
       device_id text,
       date_and_hour text,
       created_at timestamp,
       topic text,
       owner text,
       payload blob,
       content_type text,
       PRIMARY KEY ((device_id, date_and_hour), created_at)
);
