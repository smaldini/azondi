--
-- Users
--

DELETE FROM users;

INSERT INTO users (id, name, email, email_verified, password_hash, password_salt, role)
           -- password: yods-pwd
           VALUES ('yods', 'Yodit S', 'yodit@opensensors.io', 'true',
           '$s0$e0801$cqq3ts8sC44H5IeKgPFudQ==$nRhabdlcODd+dJ0oXMNv3xOuQU+EYOAbVlY0oue1qWI=', 'somesalt', 'user');
INSERT INTO users (id, name, email,email_verified, password_hash, password_salt, role)
           -- password: pwd
           VALUES ('malc', 'Malcolm Sparks', 'malcolm@opensensors.io', 'true',
           '$s0$e0801$1OdSJVKv3TDR3A9tmItG4g==$qFKB40KgMoAKktWuRzSveIo8Gs2/DN+LWIjK3pXOSys=', 'somesalt', 'user');
INSERT INTO users (id, name, email,email_verified, password_hash, password_salt, role)
           -- password: michael-pwd
           VALUES ('michaelklishin', 'Michael Klishin', 'michael@opensensors.io', 'true',
           '$s0$e0801$XWBZEb8vw2oPZDM0dibFvQ==$QDUmaRKk6LwFTPynDQ2rU2Cw/Z02omLs+EHniuR8Lw8=', 'somesalt', 'user');

--
-- Devices
--

DELETE FROM devices;

INSERT INTO devices (name, owner_user_id, device_password_hash)
            -- password: device-1-pwd
             VALUES ('Pollution 1',
             'yods', '$s0$e0801$UFqu7r6NqzzA8f2Izbgjig==$D5QttKRnviio4CT8YON+m9OoesbDNen4r0c7P19pqsE=');

INSERT INTO devices (name, owner_user_id, device_password_hash)
            -- password: device-2-pwd
             VALUES ('Pollution 2',
             'yods', '$s0$e0801$obspyjv/9zmFcD9we9A3oA==$fqeO5pvrR57aaqy4EAy9P3hZ+DS/yoT9GtfJnA3aLq4=');

INSERT INTO devices (name, owner_user_id, device_password_hash)
            -- password: device-3-pwd
             VALUES ('Foo 3',
             'yods', '$s0$e0801$EGG/OmC7ZEIUOkU9t/m5XQ==$oyI8bQInV1jeaMYaV4tHxleK3Hzarr4IrLGb6dA+Vtc=');

INSERT INTO devices (name, owner_user_id, device_password_hash)
            -- password: device-4-pwd
             VALUES ('Fab 5',
             'michaelklishin', '$s0$e0801$fndkuyOGRHJcwU0LsTQwpw==$3t5c0YAk6F7ekWD8fbyOvSJholAKYReCdCq8uD/suWM=');

--
-- Topics
--

DELETE FROM topics;

INSERT INTO topics (unit, name, topic, public, owner)
            VALUES ('PM10', 'pm10', '/users/yods/pm10-1', true, 'yods');
INSERT INTO topics (unit, name, topic, public, owner)
            VALUES ('PM10', 'pm10-2', '/users/yods/pm10-2', true, 'yods');
INSERT INTO topics (unit, name, topic, public, owner)
            VALUES ('celcius', 'temprature', '/users/yods/e12/temp1', true, 'yods');

INSERT INTO topics (unit, name, topic, public, owner)
            VALUES ('PM10', 'pm10-private', '/users/yods/pm10-private', false, 'yods');


--
-- Subscriptions
--

INSERT INTO subscriptions (user_id, topic)
            VALUES ('michaelklishin', '/users/yods/pm10-1');
INSERT INTO subscriptions (user_id, topic)
            VALUES ('michaelklishin', '/users/yods/pm10-2');
INSERT INTO subscriptions (user_id, topic)
            VALUES ('michaelklishin', '/users/yods/e12/temp1');

--
-- WS bridge session tokens
--

INSERT INTO ws_session_tokens (token, user_id)
            VALUES ('075cb213-0726-46c7-8bd3-210919fa6b9a', 'yods');

INSERT INTO ws_session_tokens (token, user_id)
            VALUES ('e162b69f-2095-409c-940b-8914c22e97ef', 'malc');

INSERT INTO ws_session_tokens (token, user_id)
            VALUES ('41a27093-a564-4012-b796-058ebd94c6c0', 'michaelklishin');
