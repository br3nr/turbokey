package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"golang.org/x/oauth2"
)

const (
	ScopeIdentify = "identify"
	ScopeEmail    = "email"
)

type DiscordUser struct {
	id            string `json:"id"`
	username      string `json:"username"`
	avatar_url    string `json:"avatar"`
	discriminator string `json:"discriminator"`
}

var store = sessions.NewCookieStore([]byte("your-secret-key"))

var Endpoint = oauth2.Endpoint{
	AuthURL:   "https://discord.com/api/oauth2/authorize",
	TokenURL:  "https://discord.com/api/oauth2/token",
	AuthStyle: oauth2.AuthStyleInParams,
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage Endpoint Hit")
}

func redirect(w http.ResponseWriter, r *http.Request) {
	clientID := os.Getenv("BOT_CLIENT_ID")
	clientSecret := os.Getenv("BOT_CLIENT_SECRET")

	conf := oauth2.Config{
		RedirectURL:  "http://localhost:8000/auth/redirect",
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Scopes:       []string{ScopeIdentify},
		Endpoint:     Endpoint,
	}

	token, err := conf.Exchange(context.Background(), r.FormValue("code"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res, err := conf.Client(context.Background(), token).Get("https://discord.com/api/users/@me")
	if err != nil || res.StatusCode != http.StatusOK {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var user *DiscordUser
	err = json.Unmarshal(body, &user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session, err := store.Get(r, "turbo-session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session.Values["id"] = user.id
	session.Values["discriminator"] = user.discriminator
	session.Values["avatar_url"] = user.avatar_url
	session.Values["username"] = user.username

	err = session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "http://localhost:3000", http.StatusFound)
}

func login(w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "turbo-session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	user := DiscordUser{
		id:            session.Values["id"].(string),
		discriminator: session.Values["discriminator"].(string),
		avatar_url:    session.Values["avatar_url"].(string),
		username:      session.Values["username"].(string),
	}

	userJSON, err := json.Marshal(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(userJSON)
}

func handleRequests() {
	r := chi.NewRouter()

	r.Get("/", homePage)
	r.Get("/auth/redirect", redirect)
	r.Get("/auth/login", login)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowedMethods:   []string{"GET", "HEAD", "POST", "PUT", "OPTIONS"},
	})

	handler := c.Handler(r)

	port := ":8000"
	fmt.Printf("Server is running on port %s...\n", port)
	err := http.ListenAndServe(port, handler)
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env")
	} else {
		handleRequests()
	}
}
