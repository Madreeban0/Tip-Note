package com.Tip_note.Note.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct; // Make sure this is jakarta.annotation.PostConstruct
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // Inject the secret string from application.properties
    @Value("${jwt.secret}")
    private String secretString;

    private Key SECRET_KEY;

    // This method runs after the bean is created
    @PostConstruct
    public void init() {
        // Decode the Base64 secret string into bytes
        byte[] keyBytes = Decoders.BASE64.decode(secretString);
        // Create the HMAC-SHA key from the bytes
        this.SECRET_KEY = Keys.hmacShaKeyFor(keyBytes);
    }

    // Token validity (10 hours)
    private static final long TOKEN_VALIDITY = 1000 * 60 * 60 * 10;

    // Get username (which is the email) from the token
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // Get expiration date from the token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    // Generic function to get any claim from the token
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    // Parse the token and get all its claims
    private Claims getAllClaimsFromToken(String token) {
        // This parser will also validate the signature
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
    }

    // Check if the token is expired
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    // Generate a new token for a user
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // You could add other claims here, like roles
        return doGenerateToken(claims, userDetails.getUsername());
    }

    // Helper method to actually create the token
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject) // The "subject" is the user's email
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY))
                // Sign with the static key and specify the algorithm
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256) 
                .compact();
    }

    // Validate the token: checks if username matches and token is not expired
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}

