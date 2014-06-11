--
-- Users
--

DELETE FROM users;

INSERT INTO users (id, name, email, password_hash, role)
           -- password: yods-pwd
           VALUES ('yods', 'Yodit S', 'yodit@opensensors.io',
           '$s0$e0801$dfKRFZiEStuBQm+DKQr5NQ==$9qd8nBxPSsCqcSFxMPGaqofJfeQwgMkiQAIhO7gzm34=', 'user');
INSERT INTO users (id, name, email, password_hash, role)
           -- password: malcolmsparks-pwd
           VALUES ('malcolmsparks', 'Malcolm Sparks', 'malcolm@opensensors.io',
           '$s0$e0801$/eFWoMrBH8qvbOV6Sha5oA==$1XCf1mQvBdIWqY0rtcZax426itISxCq/J/LMMqUuHqM=', 'user');
INSERT INTO users (id, name, email, password_hash, role)
           -- password: michael-pwd
           VALUES ('michaelklishin', 'Michael Klishin', 'michael@opensensors.io',
           '$s0$e0801$1/DTkx1MtXX511KH9TRjqg==$Skpfo5t6IyBY465bKXaTcOdMCL/jJEUF/kqM/swzGwc=', 'user');

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
            VALUES ('PM10', 'pm10-private', '/users/yods/pm10-private', false, 'yods');


--
-- Subscriptions
--

INSERT INTO subscriptions (user_id, topic)
            VALUES ('michaelklishin', 'yods/device1/sensor1');
INSERT INTO subscriptions (user_id, topic)
            VALUES ('michaelklishin', 'yods/device1/sensor2');
INSERT INTO subscriptions (user_id, topic)
            VALUES ('michaelklishin', 'yods/device2/sensor1');

--
-- WS bridge session tokens
--

INSERT INTO ws_session_tokens (token, user_id)
            VALUES ('075cb213-0726-46c7-8bd3-210919fa6b9a', 'yods');

INSERT INTO ws_session_tokens (token, user_id)
            VALUES ('e162b69f-2095-409c-940b-8914c22e97ef', 'malcolmsparks');

INSERT INTO ws_session_tokens (token, user_id)
            VALUES ('41a27093-a564-4012-b796-058ebd94c6c0', 'michaelklishin');
