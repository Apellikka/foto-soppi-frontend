package com.apellikka.fotosoppi.foto_soppi.database;

import org.springframework.data.repository.PagingAndSortingRepository;

interface ImageRepository extends PagingAndSortingRepository<Image, Long> {
    
}
