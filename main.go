package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"reflect"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	Id       uint      `json:"id"`
	Name     string    `json:"name"`
	Password string    `json:"password"`
	Email    string    `json:"email"`
	Avatar   string    `json:"avatar"`
	List     []Country `json:"list"`
}

type Country struct {
	Name string `json:"name"`
}

type Article struct {
	Id      string `json:"Id"`
	Title   string `json:"Title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}

type ErrorResponse struct {
	StatusCode   int    `json:"status"`
	ErrorMessage string `json:"message"`
}

type Token struct {
	UserID uint
	Name   string
	Email  string
	*jwt.StandardClaims
}

var Articles []Article

type Users []User

var collection *mongo.Collection

var (
	// key must be 16, 24 or 32 bytes long (AES-128, AES-192 or AES-256)
	key   = []byte("super-secret-key")
	store = sessions.NewCookieStore(key)
)

// cookie handling
/*
var cookieHandler = securecookie.New(
	securecookie.GenerateRandomKey(64),
	securecookie.GenerateRandomKey(32))
*/

func loadTheEnv() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

/* CONNECTION TO MONGODB  */

func createDBInstance() {
	connectionString := os.Getenv("DB_URI")
	dbName := os.Getenv("DB_NAME")
	collName := os.Getenv("DB_COLLECTION_NAME")
	clientOptions := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")
	collection = client.Database(dbName).Collection(collName)
	fmt.Println("Collection instance created!")
}

/* LOAD ENVIRONMENT VARIABLES & CALL MONGODB FUNCTION */

func init() {
	loadTheEnv()
	createDBInstance()
}

/* STAR MAIN ROUTER HANDLER  */

func main() {
	handleRequest()
}

/*  UTIL FUNCTIONS TO HANDLE ERROR */

func GetError(err error, w http.ResponseWriter) {

	log.Fatal(err.Error())
	var response = ErrorResponse{
		ErrorMessage: err.Error(),
		StatusCode:   http.StatusInternalServerError,
	}

	message, _ := json.Marshal(response)

	w.WriteHeader(response.StatusCode)
	w.Write(message)
}

/* func setSession(userName string, response http.ResponseWriter) {
	value := map[string]string{
		"name": userName,
	}
	if encoded, err := cookieHandler.Encode("session", value); err == nil {
		cookie := &http.Cookie{
			Name:  "session",
			Value: encoded,
			Path:  "/",
		}
		http.SetCookie(response, cookie)
	}
} */

/* SET HEADERS UTILS  */

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

/* ***ROUTES*** */
/* *********************************************************** */

/* LOGIN */

func login(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Login route...")
	w.Header().Set("Content-Type", "application/json")
	setupResponse(&w, r)
	session, _ := store.Get(r, "cookie-name")

	reqBody, _ := ioutil.ReadAll(r.Body)
	var user User
	json.Unmarshal(reqBody, &user)

	fmt.Println(user.Email)
	res := findOne(user.Email, user.Password)

	fmt.Println(res)

	json.NewEncoder(w).Encode(res)

	session.Values["authenticated"] = true
	session.Save(r, w)
}

/* LOGOUT (NOT IMPLEMANTED) */

func logout(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "cookie-name")

	// Revoke users authentication
	session.Values["authenticated"] = false
	session.Save(r, w)
}

func allUsers(w http.ResponseWriter, r *http.Request) {
	fmt.Println("users hit")
	w.Header().Set("Content-Type", "application/json")
	setupResponse(&w, r)
	payload := getAllUsers()
	json.NewEncoder(w).Encode(payload)
}

func setUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("users post hitted")
	w.Header().Set("Content-Type", "application/json")
	setupResponse(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	reqBody, _ := ioutil.ReadAll(r.Body)
	var user User
	json.Unmarshal(reqBody, &user)

	pass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println(err)
		err := ErrorResponse{
			ErrorMessage: "Password Encryption  failed",
		}
		json.NewEncoder(w).Encode(err)
	}
	user.Password = string(pass)
	res, err := collection.InsertOne(context.Background(), bson.M{"name": user.Name, "email": user.Email, "password": user.Password})
	if err != nil {
		return
	}
	fmt.Println(res.InsertedID)
	json.NewEncoder(w).Encode(user)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {

}

func getUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("getuser Route ")
	w.Header().Set("Content-Type", "application/json")
	setupResponse(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	vars := mux.Vars(r)

	key := vars["id"]
	User := getUserId(key)
	fmt.Println(vars)

	json.NewEncoder(w).Encode(User)
}

// func loginUser(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("Login Route")
// 	w.Header().Set("Content-Type", "application/json")
// 	setupResponse(&w, r)
// 	if (*r).Method == "OPTIONS" {
// 		return
// 	}

// }

func findOne(email, password string) map[string]interface{} {

	var user User

	filter := bson.M{"email": email}
	err := collection.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		var resp = map[string]interface{}{"status": false, "message": "Email address not found"}
		return resp

	}
	errf := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if errf != nil && errf == bcrypt.ErrMismatchedHashAndPassword {
		var resp = map[string]interface{}{"status": false, "message": "Invalid login credentials. Please try again"}
		return resp
	}
	expiresAt := time.Now().Add(time.Minute * 100000).Unix()

	tk := &Token{
		UserID: user.Id,
		Name:   user.Name,
		Email:  user.Email,
		StandardClaims: &jwt.StandardClaims{
			ExpiresAt: expiresAt,
		},
	}

	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)

	tokenString, error := token.SignedString([]byte("secret"))
	if error != nil {
		fmt.Println(error)
	}

	fmt.Printf("Found a single document: %+v\n", user)
	var resp = map[string]interface{}{"status": false, "message": "logged in"}
	resp["token"] = tokenString
	resp["user"] = user
	return resp
}

func getUserId(vars string) []primitive.M {

	id, _ := primitive.ObjectIDFromHex(vars)
	filter := bson.M{"_id": id}
	cur, err := collection.Find(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}
	var results []primitive.M
	for cur.Next(context.Background()) {
		var result bson.M
		e := cur.Decode(&result)
		if e != nil {
			log.Fatal(e)
		}
		fmt.Println("cur..>", cur, "result", reflect.TypeOf(result), reflect.TypeOf(result["_id"]))
		results = append(results, result)

	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.Background())
	return results
}

func getAllUsers() []primitive.M {

	cur, err := collection.Find(context.Background(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var results []primitive.M
	for cur.Next(context.Background()) {
		var result bson.M
		e := cur.Decode(&result)
		if e != nil {
			log.Fatal(e)
		}
		// fmt.Println("cur..>", cur, "result", reflect.TypeOf(result), reflect.TypeOf(result["_id"]))
		results = append(results, result)

	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.Background())
	return results
}

/* ****ARTICLES BLOCK****  */
func returnAllArticles(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: returnAllArticles")
	w.Header().Set("Content-Type", "application/json")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{ "message": "` + err.Error() + `"}`))
		return
	}

	defer cursor.Close(context.TODO())
	for cursor.Next(context.TODO()) {
		var results bson.M

		if err = cursor.Decode(&results); err != nil {
			log.Fatal(err)
		}

		fmt.Println(results)
	}
	json.NewEncoder(w).Encode(Articles)
}
func returnSingleArticle(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]

	// Loop over all of our Articles
	// if the article.Id equals the key we pass in
	// return the article encoded as JSON
	for _, article := range Articles {
		if article.Id == key {
			json.NewEncoder(w).Encode(article)
		}
	}
}
func createNewArticle(w http.ResponseWriter, r *http.Request) {
	// get the body of our POST request
	// unmarshal this into a new Article struct
	// append this to our Articles array.
	reqBody, _ := ioutil.ReadAll(r.Body)
	var article Article
	json.Unmarshal(reqBody, &article)
	// update our global Articles array to include
	// our new Article
	Articles = append(Articles, article)

	json.NewEncoder(w).Encode(article)
}
func deleteArticle(w http.ResponseWriter, r *http.Request) {
	// once again, we will need to parse the path parameters
	vars := mux.Vars(r)
	// we will need to extract the `id` of the article we
	// wish to delete
	id := vars["id"]

	// we then need to loop through all our articles
	for index, article := range Articles {
		// if our id path parameter matches one of our
		// articles
		if article.Id == id {
			// updates our Articles array to remove the
			// article
			Articles = append(Articles[:index], Articles[index+1:]...)
		}
	}

}

func homePage(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "cookie-name")

	// Check if user is authenticated
	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}

	// Print secret message
	fmt.Fprintln(w, "The cake is a lie!")
	fmt.Fprintf(w, "Go Server!!")
}

func handleRequest() {
	myRouter := mux.NewRouter()
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/logout", logout).Methods("GET")
	myRouter.HandleFunc("/login", login).Methods("POST")
	myRouter.HandleFunc("/users", allUsers).Methods("GET")
	myRouter.HandleFunc("/user/{id}", getUser).Methods("GET")
	myRouter.HandleFunc("/user", setUser).Methods("POST")
	myRouter.HandleFunc("/articles", returnAllArticles)
	myRouter.HandleFunc("/article", createNewArticle).Methods("POST")
	// add our new DELETE endpoint here
	myRouter.HandleFunc("/article/{id}", deleteArticle).Methods("DELETE")
	myRouter.HandleFunc("/article/{id}", returnSingleArticle)
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(myRouter)))
}
