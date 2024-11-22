from uuid import uuid4

from chromadb import EphemeralClient


class Database:
    def __init__(self) -> None:
        # Create a temporary client for conversations, to keep them private
        self.client = EphemeralClient()
        self.collection = self.client.get_or_create_collection("nirvana")

    def add(self, chat: str, metadata: dict[str, str]) -> None:
        self.collection.upsert(
            documents=[chat], metadatas=[metadata], ids=[uuid4().hex]
        )

    def query(self, prompt: str, metadata: dict[str, str]) -> list[str]:
        # Check if chats with similar metadata exist in the vector database
        where = {"$or": [{key: value} for key, value in metadata.items()]}
        result = self.collection.query(query_texts=prompt, n_results=3, where=where)
        if documents := result["documents"][0]:
            return documents
        # If no documents are found with similar metadata, return semantically
        # similar documents
        result = self.collection.query(query_texts=prompt, n_results=3)
        return result["documents"][0]
