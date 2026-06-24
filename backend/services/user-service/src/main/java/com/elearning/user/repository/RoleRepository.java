package com.elearning.user.repository;

import com.elearning.user.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Role.RoleName name);

    boolean existsByName(Role.RoleName name);
}
