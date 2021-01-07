package libs

import "net/http"

func ResponseError(w http.ResponseWriter) {
	DelSimpleCookie("oauthstate", w)
	DelSimpleCookie("access_token", w)
	w.WriteHeader(http.StatusUnauthorized)
	http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
}
