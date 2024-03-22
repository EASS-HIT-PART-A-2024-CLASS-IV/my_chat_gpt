import redis.asyncio as aioredis

from app.components.logger import logger


class AsyncRedisClient:
    _instance = None

    @classmethod
    async def get_instance(cls):
        """
        Asynchronously get the singleton instance of the Redis client.
        """
        if cls._instance is None:
            cls._instance = await cls.create_redis_client()
        return cls._instance

    @staticmethod
    async def create_redis_client():
        """
        Asynchronously create a Redis client. Tries to connect to localhost, redis, and 0.0.0.0.
        """
        hosts = ['localhost', 'redis', '0.0.0.0']
        for host in hosts:
            try:
                client = aioredis.StrictRedis(host=host, port=6379, db=0, decode_responses=True)
                # The ping command is now an awaitable coroutine
                if await client.ping():
                    logger.info(f"Successfully connected to Redis server at {host}")
                    return client
            except aioredis.ConnectionError as e:
                logger.error(f"Could not connect to Redis server at {host}: {e}.")
        raise Exception("Could not connect to any Redis server.")