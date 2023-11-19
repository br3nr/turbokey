package main

import (
	"golang.org/x/oauth2"
  "github.com/joho/godotenv"
  "os"
	"io"
  "log"
	"net/http"
	"context"
  "fmt"
)

const (
  ScopeIdentify = "identify"
  ScopeEmail = "email"
)

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
    RedirectURL: "http://localhost:8081/auth/redirect", 
    ClientID: clientID,
    ClientSecret: clientSecret,
    Scopes: []string{ScopeIdentify},
    Endpoint: Endpoint,
  }
  

  token, err := conf.Exchange(context.Background(), r.FormValue("code"))

  if err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    w.Write([]byte(err.Error()))
    return
  }

  res, err := conf.Client(context.Background(), token).Get("https://discord.com/api/users/@me")

  if err != nil || res.StatusCode != 200 {
    w.WriteHeader(http.StatusInternalServerError)
    if err != nil {
      w.Write([]byte(err.Error()))
    } else {
      w.Write([]byte(res.Status))
    }
  }

  defer res.Body.Close()

  body, err := io.ReadAll(res.Body)

  if err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    w.Write([]byte(err.Error()))
    return
  }

  w.Write(body)
}


func handleRequests() {
  http.HandleFunc("/", homePage)
  http.HandleFunc("/auth/redirect", redirect)
  log.Fatal(http.ListenAndServe(":8081", nil)) 
}

func main() {
  err := godotenv.Load()

  if err != nil {
    log.Fatal("Error loading .env")
  } else {
    handleRequests()
  }
}
