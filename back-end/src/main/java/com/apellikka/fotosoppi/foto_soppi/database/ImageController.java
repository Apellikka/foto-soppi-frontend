package com.apellikka.fotosoppi.foto_soppi.database;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping(("/images"))
public class ImageController {

    private final ImageRepository imageRepository;

    @Value("${image.base-directory}")
    private String baseDirectory;

    public ImageController(ImageRepository imageRepository) 
    {
        this.imageRepository = imageRepository;
    }
    
    @GetMapping
    public Iterable<Image> findAllImages()
    {
        return this.imageRepository.findAll(Sort.unsorted());
    }
    
}
