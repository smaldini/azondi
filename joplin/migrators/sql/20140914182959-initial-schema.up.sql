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

CREATE UNIQUE INDEX api_user_id_idx ON api_keys(id);
CREATE UNIQUE INDEX api_id_key_idx ON api_keys(api, id);
CREATE INDEX api_created_on_idx ON api_keys(created_on);
ALTER TABLE api_keys ADD CONSTRAINT api_id_fk FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE;


--
-- Devices
--

CREATE TABLE IF NOT EXISTS devices (client_id bigserial PRIMARY KEY,
                                    name text,
				    description text,
                                    owner_user_id text,
                                    device_password_hash text,
                                    created_on timestamp default current_timestamp);

CREATE UNIQUE INDEX devices_client_id_idx ON devices(client_id);
CREATE INDEX devices_owner_idx ON devices(owner_user_id);
CREATE UNIQUE INDEX devices_client_id_owner_idx ON devices(client_id, owner_user_id);
CREATE INDEX devices_created_on_idx ON devices(created_on);

ALTER TABLE devices ADD CONSTRAINT devices_owner_fk FOREIGN KEY (owner_user_id) REFERENCES users (id)  ON DELETE CASCADE;

--
-- Topics & Subscriptions
--

CREATE TABLE IF NOT EXISTS topics (unit text,
       	     	    	   name text,
                           description text,
                           topic text PRIMARY KEY,
                           public boolean,
			   owner text,
                           created_on timestamp default current_timestamp);
			   
CREATE UNIQUE INDEX topics_id_idx ON topics(topic);
CREATE INDEX topics_owner_idx ON topics(owner);
CREATE UNIQUE INDEX topics_id_owner_idx ON topics(topic, owner);
CREATE INDEX topics_created_on_idx ON topics(created_on);
ALTER TABLE topics ADD CONSTRAINT topics_owner_fk FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE;

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
