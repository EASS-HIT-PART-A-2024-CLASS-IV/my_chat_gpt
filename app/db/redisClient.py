import redis

from app.components.logger import logger


# Singleton for Redis Client
class RedisClient:
    _instance = None  # initially set to None

    @classmethod
    def get_instance(cls):
        """
        Get the singleton instance of Redis client.
        """
        if cls._instance is None:
            cls._instance = cls.create_redis_client()
        return cls._instance

    @staticmethod  # is a class method that is bound to a class rather than its object.
    def create_redis_client():
        """
        Create a Redis client. It will try to connect to localhost, redis and 0.0.0.0.
        """
        hosts = ['localhost', 'redis', '0.0.0.0']
        for host in hosts:
            try:
                client = redis.StrictRedis(host=host, port=6379, db=0, decode_responses=True)
                if client.ping():
                    logger.info(f"Successfully connected to Redis server at {host}")
                    # print(f"Successfully connected to Redis server at {host}.")
                    return client
            except redis.ConnectionError as e:
                logger.error(f"Could not connect to Redis server at {host}: {e}.")
                # print(f"Could not connect to Redis server at {host}: {e}.")
        raise Exception("Could not connect to any Redis server.")
