package com.Tip_note.Note.Security;

// This is a simple DTO (Data Transfer Object)
// It doesn't need @Entity or @Table because it's not a database model.
// Spring Boot will automatically map the incoming JSON to this object.
public class AuthRequest {

    private String email;
    private String password;

    // Getters and setters are required for Spring to map the JSON
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

