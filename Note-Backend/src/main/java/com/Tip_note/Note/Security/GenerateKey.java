package com.Tip_note.Note.Security;

import java.security.SecureRandom;
import java.util.Base64;

public class GenerateKey {
    public static void main(String[] args) {
        
        SecureRandom secureRandom = new SecureRandom();
        
    
        byte[] keyBytes = new byte[32];
        
        secureRandom.nextBytes(keyBytes);
        
    
        String base64Key = Base64.getEncoder().encodeToString(keyBytes);
   
        System.out.println("Your new JWT Secret Key (Base64):");
        System.out.println(base64Key);
    }
}
