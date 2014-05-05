--
-- Users
--

CREATE TABLE IF NOT EXISTS users (id text PRIMARY KEY,
                    name text NOT NULL,
                    email text NOT NULL,
                    password_hash text NOT NULL,
                    role text,
                    created_on timestamp default current_timestamp);

CREATE UNIQUE INDEX users_email_idx ON users(email);
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

CREATE TABLE IF NOT EXISTS devices (client_id SERIAL PRIMARY KEY,
                                    name text,
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

CREATE TABLE IF NOT EXISTS topics (device_id text NOT NULL,
                           unit text,
                           type text,
                           topic_id text PRIMARY KEY,
                           public boolean,
                           created_on timestamp default current_timestamp);

CREATE INDEX topics_device_id_idx ON topics(device_id);
ALTER TABLE topics ADD CONSTRAINT topics_device_id_fk FOREIGN KEY (device_id) REFERENCES devices (device_id) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS subscriptions (user_id text NOT NULL,
                           topic text NOT NULL,
                           created_on timestamp default current_timestamp,
                           PRIMARY KEY (user_id, topic),
                           CONSTRAINT no_duplicates UNIQUE (user_id, topic));

CREATE INDEX subscriptions_user_id_idx ON subscriptions(user_id);
CREATE INDEX subscriptions_user_id_topic_idx ON subscriptions(user_id, topic);

ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_user_id_fk  FOREIGN KEY (user_id) REFERENCES users   (id) ON DELETE CASCADE;

--
-- WS bridge session tokens
--

CREATE TABLE IF NOT EXISTS ws_session_tokens (
       token varchar(255) PRIMARY KEY,
       user_id text NOT NULL,
       expires_at timestamp default (current_timestamp + interval '24 hours')
);

ALTER TABLE ws_session_tokens ADD CONSTRAINT ws_session_tokens_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

