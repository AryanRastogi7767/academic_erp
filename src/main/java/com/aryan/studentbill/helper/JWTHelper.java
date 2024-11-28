package com.aryan.studentbill.helper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTHelper {
    private String SECRET_KEY = "q3J1dSNDk92jlRmXx8I+EkvFHrHXxhoNf6OMtGHu9jY=";

    // Extract username from the token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract expiration date from the token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extract claims
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract all claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    // Check if token is expired
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Create token with claims (Make this method static)
    public static String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Token valid for 1 hour
                .signWith(SignatureAlgorithm.HS256, "q3J1dSNDk92jlRmXx8I+EkvFHrHXxhoNf6OMtGHu9jY=")
                .compact();
    }

    // Generate token
    public static String generateToken(String roll_number) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, roll_number); // Call static createToken method
    }

    // Validate token
    public Boolean validateToken(String token, String roll_number) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(roll_number) && !isTokenExpired(token));
    }
}
