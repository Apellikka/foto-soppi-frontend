package com.apellikka.fotosoppi.foto_soppi;

import org.springframework.data.repository.PagingAndSortingRepository;

interface ImageRepository extends PagingAndSortingRepository<Image, Long> {
    
}
