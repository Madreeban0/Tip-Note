package com.Tip_note.Note.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("/api/hello")
    public String sayHello() {
        // This is a simple function that returns a text string
        return "Hello, the API is working!";
    }
}
