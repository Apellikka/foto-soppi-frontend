package com.apellikka.fotosoppi.foto_soppi.controller;

import org.springframework.web.bind.annotation.RestController;

import com.apellikka.fotosoppi.foto_soppi.repository.UserRepository;

@RestController
public class UserController {
    
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
