package com.Tip_note.Note.Controllers;

import com.Tip_note.Note.Models.User;
import com.Tip_note.Note.Repository.userRepository;
import com.Tip_note.Note.Security.AuthRequest;
import com.Tip_note.Note.Security.AuthResponse;
import com.Tip_note.Note.Security.JwtUtil;
import com.Tip_note.Note.Security.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
// We don't need /api on this controller, so login is at /login
// The WebConfig will handle CORS, but we can leave this here as a backup.
@RequestMapping("/api")
@CrossOrigin(origins = "https://tippnote.netlify.app") 
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private userRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthRequest authRequest) {
        
        // Check if user already exists
        if (userRepository.existsByEmail(authRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user's account
        User newUser = new User();
        newUser.setEmail(authRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(authRequest.getPassword())); // Hash the password
        
        userRepository.save(newUser);

        // After registering, automatically log them in by generating a token
        final UserDetails userDetails = myUserDetailsService.loadUserByUsername(authRequest.getEmail());
        final String token = jwtUtil.generateToken(userDetails);

        // Return the token
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        
        try {
            // Try to authenticate the user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            // If authentication fails, throw an exception
            return ResponseEntity.status(401).body("Incorrect email or password");
        }

        // If authentication is successful, generate a token
        final UserDetails userDetails = myUserDetailsService.loadUserByUsername(authRequest.getEmail());
        final String token = jwtUtil.generateToken(userDetails);

        // Return the token in an AuthResponse
        return ResponseEntity.ok(new AuthResponse(token));
    }
}

