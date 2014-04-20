--
-- Users
--

CREATE TABLE IF NOT EXISTS users (id text PRIMARY KEY,
                    fname text,
                    sname text,
                    email text,
                    password_hash text,
                    publisher boolean,
                    role text,
                    created_on timestamp default current_timestamp);

CREATE UNIQUE INDEX users_email_idx ON users(email);
CREATE INDEX users_publisher_idx  ON users(publisher);
CREATE INDEX users_created_on_idx ON users(created_on);

--
-- API keys
--

CREATE TABLE IF NOT EXISTS api_keys (api text,
                                     id text PRIMARY KEY,
                                     created_on timestamp default current_timestamp);

--
-- Devices
--

CREATE TABLE IF NOT EXISTS devices (client_id text PRIMARY KEY,
                                    name text,
                                    device_id text,
                                    description text,
                                    owner text,
                                    device_password_hash text,
                                    created_on timestamp default current_timestamp);

CREATE UNIQUE INDEX devices_device_id_idx ON devices(device_id);
CREATE INDEX devices_owner_idx ON devices(owner);
CREATE UNIQUE INDEX devices_device_id_owner_idx ON devices(device_id, owner);
CREATE INDEX devices_created_on_idx ON devices(created_on);

ALTER TABLE devices ADD CONSTRAINT devices_owner_fk FOREIGN KEY (owner) REFERENCES users (id);

--
-- Topics & Subscriptions
--

CREATE TABLE IF NOT EXISTS topics (device_id text,
                           unit text,
                           type text,
                           topic_id text PRIMARY KEY,
                           public boolean,
                           created_on timestamp default current_timestamp);

CREATE INDEX topics_device_id_idx ON topics(device_id);
ALTER TABLE topics ADD CONSTRAINT topics_device_id_fk FOREIGN KEY (device_id) REFERENCES devices (device_id) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS subscriptions (id text PRIMARY KEY,
                           topic_id text,
                           created_on timestamp default current_timestamp);

CREATE INDEX subscriptions_topic_id_idx ON subscriptions(topic_id);

ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_topic_id_fk FOREIGN KEY (topic_id) REFERENCES topics (topic_id);
