package com.Tip_note.Note.Security;

public class AuthResponse {

    private final String token;

    // Constructor
    public AuthResponse(String token) {
        this.token = token;
    }

    // Getter - required for Spring to serialize this to JSON
    public String getToken() {
        return token;
    }
}

