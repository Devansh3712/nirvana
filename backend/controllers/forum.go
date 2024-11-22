package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type ForumRequest struct {
	Content string `json:"content"`
}

func StorePost(w http.ResponseWriter, r *http.Request) {
	var reqBody ForumRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		log.Fatal(err)
	}
	createPost("Devansh", reqBody.Content)
}

func StoreComment(w http.ResponseWriter, r *http.Request) {
	var reqBody ForumRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		log.Fatal(err)
	}
	postId := chi.URLParam(r, "postId")
	pid, _ := strconv.Atoi(postId)
	createComment(pid, "Devansh", reqBody.Content)
}

func FetchPosts(w http.ResponseWriter, r *http.Request) {
	posts := getPosts()
	render.JSON(w, r, posts)
}

func FetchComments(w http.ResponseWriter, r *http.Request) {
	postId := chi.URLParam(r, "postId")
	pid, _ := strconv.Atoi(postId)
	comments := getComments(pid)
	render.JSON(w, r, comments)
}
