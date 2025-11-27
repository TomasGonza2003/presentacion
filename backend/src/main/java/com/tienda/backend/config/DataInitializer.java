package com.tienda.backend.config;

import com.tienda.backend.model.Role;
import com.tienda.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if roles exist, if not, create them
        if (roleRepository.count() == 0) {
            Role adminRole = new Role();
            adminRole.setName(Role.RoleName.ROLE_ADMIN);
            roleRepository.save(adminRole);

            Role vendedorRole = new Role();
            vendedorRole.setName(Role.RoleName.ROLE_VENDEDOR);
            roleRepository.save(vendedorRole);

            Role clienteRole = new Role();
            clienteRole.setName(Role.RoleName.ROLE_CLIENTE);
            roleRepository.save(clienteRole);

            System.out.println("Roles initialized in Database");
        }
    }
}
