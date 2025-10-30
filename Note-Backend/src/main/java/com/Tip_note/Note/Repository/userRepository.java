package com.Tip_note.Note.Repository;

import com.Tip_note.Note.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<User, Long> {
    
    // Spring Data JPA will automatically create the query "SELECT * FROM users WHERE email = ?"
    Optional<User> findByEmail(String email);

    // Automatically creates "SELECT CASE WHEN COUNT(*) > 0 THEN true ELSE false END FROM users WHERE email = ?"
    Boolean existsByEmail(String email);
}