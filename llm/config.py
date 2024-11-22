from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class EnvironmentVariables(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    GROQ_API_KEY: str
    GEMINI_API_KEY: str


@lru_cache()
def get_env_variables():
    return EnvironmentVariables()


env = get_env_variables()
