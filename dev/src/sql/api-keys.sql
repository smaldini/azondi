--
-- Tokens (such as api-keys)
--
DELETE FROM tokens WHERE id = 'letmedoit';

INSERT INTO tokens (id, content, type)
            VALUES ('letmedoit', '{:cylon/scopes #{:superuser/read-users}}', 'API-KEYS');
