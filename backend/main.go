package main

import (
	"log"
	"net/http"

	"github.com/Devansh3712/niravana/controllers"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:  []string{"*"},
		AllowOriginFunc: func(r *http.Request, origin string) bool { return true },
	}))

	r.Post("/emotion-analysis", controllers.StoreJournalEntry)
	r.Get("/entries", controllers.FetchJournalEntries)
	r.Post("/forum/posts", controllers.StorePost)
	r.Post("/forum/comments/{postId}", controllers.StoreComment)

	if err := http.ListenAndServe(":8000", r); err != nil {
		log.Fatal(err)
	}
}
