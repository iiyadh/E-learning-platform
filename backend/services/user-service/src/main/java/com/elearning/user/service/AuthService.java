package com.elearning.user.service;

import com.elearning.security.JwtService;
import com.elearning.user.dto.LoginRequest;
import com.elearning.user.dto.LoginResponse;
import com.elearning.user.dto.RefreshRequest;
import com.elearning.user.dto.RegisterRequest;
import com.elearning.user.dto.RegisterResponse;
import com.elearning.user.entity.RefreshToken;
import com.elearning.user.entity.Role;
import com.elearning.user.entity.User;
import com.elearning.user.repository.RefreshTokenRepository;
import com.elearning.user.repository.RoleRepository;
import com.elearning.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Value("${jwt.refresh-token-expiration:604800000}")
    private long refreshTokenExpiration;

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already taken");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }

        Role studentRole = roleRepository.findByName(Role.RoleName.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Default role ROLE_STUDENT not found"));

        User user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .roles(Set.of(studentRole))
                .build();

        userRepository.save(user);

        return RegisterResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .message("Registration successful")
                .build();
    }

    @Transactional
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmailOrUsername(request.getUsernameOrEmail(), request.getUsernameOrEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        String accessToken = jwtService.generateAccessToken(user.getUsername(), roles);
        String rawRefreshToken = createRefreshToken(user);

        return LoginResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .roles(Set.copyOf(roles))
                .accessToken(accessToken)
                .refreshToken(rawRefreshToken)
                .message("Login successful")
                .build();
    }

    @Transactional
    public LoginResponse refresh(RefreshRequest request) {
        RefreshToken stored = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new IllegalArgumentException("Invalid refresh token"));

        if (stored.isRevoked() || stored.getExpiresAt().isBefore(Instant.now())) {
            throw new IllegalArgumentException("Refresh token expired or revoked");
        }

        User user = stored.getUser();

        // Rotate: revoke the used token
        stored.setRevoked(true);
        refreshTokenRepository.save(stored);

        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        String newAccessToken = jwtService.generateAccessToken(user.getUsername(), roles);
        String newRawRefreshToken = createRefreshToken(user);

        return LoginResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .roles(Set.copyOf(roles))
                .accessToken(newAccessToken)
                .refreshToken(newRawRefreshToken)
                .message("Token refreshed")
                .build();
    }

    private String createRefreshToken(User user) {
        String raw = UUID.randomUUID().toString();
        RefreshToken token = RefreshToken.builder()
                .token(raw)
                .user(user)
                .expiresAt(Instant.now().plusMillis(refreshTokenExpiration))
                .build();
        refreshTokenRepository.save(token);
        return raw;
    }
}
