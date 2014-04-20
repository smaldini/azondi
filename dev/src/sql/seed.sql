--
-- Users
--

DELETE FROM users;

INSERT INTO users (id, fname, sname, email, password_hash, publisher, role)
           -- password: yods-pwd
           VALUES ('yods', 'Yodit', 'Stanton', 'yodit@opensensors.io',
           '$s0$e0801$dfKRFZiEStuBQm+DKQr5NQ==$9qd8nBxPSsCqcSFxMPGaqofJfeQwgMkiQAIhO7gzm34=', true, 'user');
INSERT INTO users (id, fname, sname, email, password_hash, publisher, role)
           -- password: malcolmsparks-pwd
           VALUES ('malcolmsparks', 'Malcolm', 'Sparks', 'malcolm@opensensors.io',
           '$s0$e0801$/eFWoMrBH8qvbOV6Sha5oA==$1XCf1mQvBdIWqY0rtcZax426itISxCq/J/LMMqUuHqM=', true, 'user');
INSERT INTO users (id, fname, sname, email, password_hash, publisher, role)
           -- password: michael-pwd
           VALUES ('michaelklishin', 'Michael', 'Klishin', 'michael@opensensors.io',
           '$s0$e0801$1/DTkx1MtXX511KH9TRjqg==$Skpfo5t6IyBY465bKXaTcOdMCL/jJEUF/kqM/swzGwc=', true, 'user');

--
-- Devices
--

DELETE FROM devices;

INSERT INTO devices (client_id, name, device_id, description, owner, device_password_hash)
            -- password: device-1-pwd
             VALUES ('3221e1gltf8vlofaf6to', 'device1', '79f4572a-5493-486e-9abe-7337ea06ba4b', '',
             'yods', '$s0$e0801$UFqu7r6NqzzA8f2Izbgjig==$D5QttKRnviio4CT8YON+m9OoesbDNen4r0c7P19pqsE=');

INSERT INTO devices (client_id, name, device_id, description, owner, device_password_hash)
            -- password: device-2-pwd
             VALUES ('asqv8fs0moo0kv7mknev9', 'device2', '24f9eb8a-ffee-4ec6-b593-11bbcb749a86', '',
             'yods', '$s0$e0801$obspyjv/9zmFcD9we9A3oA==$fqeO5pvrR57aaqy4EAy9P3hZ+DS/yoT9GtfJnA3aLq4=');

INSERT INTO devices (client_id, name, device_id, description, owner, device_password_hash)
            -- password: device-3-pwd
             VALUES ('e4ih3bn0uqr89ehbodeas', 'device3', 'd6acc822-f46a-4c45-88c0-4c29284fd4af', '',
             'yods', '$s0$e0801$EGG/OmC7ZEIUOkU9t/m5XQ==$oyI8bQInV1jeaMYaV4tHxleK3Hzarr4IrLGb6dA+Vtc=');

--
-- Topics
--

DELETE FROM topics;

INSERT INTO topics (device_id, unit, type, topic_id, public)
            VALUES ('79f4572a-5493-486e-9abe-7337ea06ba4b', 'PM10', 'PM', 'yods/dusty/pm10', true);


--
-- Subscriptions
--

