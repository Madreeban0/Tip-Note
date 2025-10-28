package com.Tip_note.Note.Repository;



import com.Tip_note.Note.Models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface noteRepository extends JpaRepository<Note, Long> {
    
    // By extending JpaRepository, you instantly get methods like:
    // - save()         (create a new note or update an existing one)
    // - findById()     (find one note by its ID)
    // - findAll()      (find all notes)
    // - deleteById()   (delete a note)
    //
}
