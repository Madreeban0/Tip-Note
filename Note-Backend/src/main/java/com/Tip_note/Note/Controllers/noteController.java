package com.Tip_note.Note.Controllers;

import com.Tip_note.Note.Models.Note;
import com.Tip_note.Note.Repository.noteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class noteController {
    
    @Autowired
    private noteRepository NoteRepository;
    
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
