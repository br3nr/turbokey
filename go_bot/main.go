package main

import (
	"context"
	"encoding/json"
	"encoding/gob"
  "fmt"
	"io"
	"log"
	"net/http"
	"os"
	"github.com/go-chi/chi"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"golang.org/x/oauth2"
  "github.com/alexedwards/scs/v2"
)

const (
	ScopeIdentify = "identify"
	ScopeEmail    = "email"
)

var sessionManager *scs.SessionManager

type DiscordUser struct {
  ID            string  `json:"id"`
	Username      string  `json:"username"`
	Avatar        string  `json:"avatar"`
	Banner        string  `json:"banner"`
}

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

  sessionManager.Put(r.Context(), "id", user.ID) 
  sessionManager.Put(r.Context(), "username", user.Username) 
  sessionManager.Put(r.Context(), "avatar", user.Avatar) 
  sessionManager.Put(r.Context(), "banner", user.Banner) 
	
  http.Redirect(w, r, "http://localhost:3000", http.StatusFound)
}

func login(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
    
  id := sessionManager.GetString(r.Context(), "id")
  username := sessionManager.GetString(r.Context(), "username")
  avatar := sessionManager.GetString(r.Context(), "avatar")
  banner := sessionManager.GetString(r.Context(), "banner")

  var user DiscordUser
  user.ID = id
  user.Username = username
  user.Avatar = avatar
  user.Banner = banner

  b, err := json.Marshal(user)

  if err!=nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  fmt.Println(string(b))
  w.Write(b)
}

func handleRequests() {
  sessionManager = scs.New()
  gob.Register(DiscordUser{})
	
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
	err := http.ListenAndServe(port, sessionManager.LoadAndSave(handler))
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
