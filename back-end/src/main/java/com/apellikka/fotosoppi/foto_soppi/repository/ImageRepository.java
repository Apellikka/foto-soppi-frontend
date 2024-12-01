package com.apellikka.fotosoppi.foto_soppi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apellikka.fotosoppi.foto_soppi.database.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
        
}
