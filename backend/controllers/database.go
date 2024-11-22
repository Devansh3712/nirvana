package controllers

import (
	"database/sql"
	"log"
	"time"

	_ "github.com/lib/pq"
)

var db *sql.DB

type JournalEntry struct {
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}

type ForumEntry struct {
	Id        int       `json:"id"`
	Author    string    `json:"author"`
	Content   string    `json:"content"`
	Likes     int       `json:"likes"`
	CreatedAt time.Time `json:"created_at"`
}

type Post struct {
	ForumEntry
}

type Comment struct {
	PostId int `json:"post_id"`
	ForumEntry
}

func init() {
	dsn := "host=localhost port=5432 user=postgres password=root dbname=nirvana"
	var err error
	db, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal(err)
	}
	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}
}

func createJournalEntry(title, entry string) {
	query := "INSERT INTO journal VALUES ($1, $2, $3)"
	if _, err := db.Exec(query, title, entry, time.Now()); err != nil {
		log.Fatal(err)
	}
}

func getJournalEntries() []JournalEntry {
	var title, body string
	var createdAt time.Time
	var entries []JournalEntry
	query := "SELECT * FROM journal"
	rows, err := db.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		if err := rows.Scan(&title, &body, &createdAt); err != nil {
			log.Fatal(err)
		}
		entries = append(entries, JournalEntry{Title: title, Content: body, CreatedAt: createdAt})
	}
	return entries
}

func createPost(author, content string) {
	query := "INSERT INTO posts(author, content, likes, created_at) VALUES ($1, $2, $3, $4)"
	if _, err := db.Exec(query, author, content, 0, time.Now()); err != nil {
		log.Fatal(err)
	}
}

func getPosts() []Post {
	var id, likes int
	var author, content string
	var createdAt time.Time
	var entries []Post
	query := "SELECT * FROM post"
	rows, err := db.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		if err := rows.Scan(&id, &author, &content, &likes, &createdAt); err != nil {
			log.Fatal(err)
		}
		entries = append(entries, Post{
			ForumEntry{
				Id: id, Author: author, Content: content, Likes: likes, CreatedAt: createdAt,
			},
		})
	}
	return entries
}

func createComment(postId int, author, content string) {
	query := "INSERT INTO comments(pid, author, content, likes, created_at) VALUES ($1, $2, $3, $4, $5)"
	if _, err := db.Exec(query, postId, author, content, 0, time.Now()); err != nil {
		log.Fatal(err)
	}
}

func getComments(pid int) []Comment {
	var id, postId, likes int
	var author, content string
	var createdAt time.Time
	var entries []Comment
	query := "SELECT * FROM comments WHERE pid = $1"
	rows, err := db.Query(query, pid)
	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		if err := rows.Scan(&id, &postId, &author, &content, &likes, &createdAt); err != nil {
			log.Fatal(err)
		}
		entries = append(entries, Comment{
			postId,
			ForumEntry{
				Id: id, Author: author, Content: content, Likes: likes, CreatedAt: createdAt,
			},
		})
	}
	return entries
}
