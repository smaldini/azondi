CREATE KEYSPACE IF NOT EXISTS opensensors
  WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};

CREATE KEYSPACE IF NOT EXISTS opensensors_test
  WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};
