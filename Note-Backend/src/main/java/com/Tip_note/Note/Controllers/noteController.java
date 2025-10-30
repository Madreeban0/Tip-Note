package com.Tip_note.Note.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import com.Tip_note.Note.Models.Note;
import com.Tip_note.Note.Repository.noteRepository;

record AuthRequest(String email, String password) {}



@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "https://tippnote.netlify.app")
public class noteController {
    
    @Autowired
    private noteRepository NoteRepository;
     @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthRequest authRequest) {
        // Log to console to show it's working
        System.out.println("Registering user: " + authRequest.email());

        // --- Placeholder Logic ---
        // In a real app, you would:
        // 1. Check if user already exists
        // 2. Hash the password (e.g., with BCryptPasswordEncoder)
        // 3. Save the new User object to your UserRepository
        // 4. Return a success response (or a token)

        // Return a simple success message for now
        // Your React code expects a JSON response
        Map<String, String> response = Map.of("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }

  
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest) {
        // Log to console to show it's working
        System.out.println("Logging in user: " + authRequest.email());

        // --- Placeholder Logic ---
        // In a real app, you would:
        // 1. Find the user by email in your UserRepository
        // 2. Check if the user exists
        // 3. Compare the hashed password from the DB with the plain-text password
        // 4. If valid, create and return a JWT token

        // Return a simple success message (and maybe a dummy token)
        // Your React code expects a JSON response
        Map<String, String> response = Map.of(
            "message", "Login successful",
            "token", "dummy-jwt-token-replace-with-real-one"
        );
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/notes")
    public List<Note> getAllNotes(){
        return NoteRepository.findAll();
    }
      
    @PostMapping("/notes")
    public Note createNote(@RequestBody Note note) {
        return NoteRepository.save(note);
    }

    @GetMapping("/note/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id){
        Optional<Note> noteId = NoteRepository.findById(id);

        if(noteId.isPresent()){
            return ResponseEntity.ok(noteId.get());
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/notes/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note noteDetails){
        Optional<Note> optionalNote = NoteRepository.findById(id);

        if(optionalNote.isPresent()){
            Note note = optionalNote.get();
            note.setTitle(noteDetails.getTitle());
            note.setContent(noteDetails.getContent());
            Note updateNote = NoteRepository.save(note);
            return ResponseEntity.ok(updateNote);
        } else{
            return ResponseEntity.notFound().build();
        }
    } 

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id){
        Optional<Note> optionalNote = NoteRepository.findById(id);

        if(optionalNote.isPresent()){
            NoteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else{
            return ResponseEntity.notFound().build();
        }
    }
    
}
