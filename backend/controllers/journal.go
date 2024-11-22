package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/render"
)

type JournalRequest struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

type EmotionAnalysisResponse struct {
	Lable string  `json:"label"`
	Score float64 `json:"score"`
}

func StoreJournalEntry(w http.ResponseWriter, r *http.Request) {
	// store entry in database
	var reqBody JournalRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		log.Fatal(err)
	}
	createJournalEntry(reqBody.Title, reqBody.Body)

	// emotional analysis of entry
	url := "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions"
	data := []byte(fmt.Sprintf(`{"text": "%s"}`, reqBody.Body))

	client := &http.Client{}
	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(data))
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Add("Authorization", "Bearer <API_TOKEN>")

	res, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	var body []EmotionAnalysisResponse
	if err := json.NewDecoder(res.Body).Decode(&body); err != nil {
		log.Fatal(err)
	}
	render.JSON(w, r, body[:5])
}

func FetchJournalEntries(w http.ResponseWriter, r *http.Request) {
	entries := getJournalEntries()
	render.JSON(w, r, entries)
}
