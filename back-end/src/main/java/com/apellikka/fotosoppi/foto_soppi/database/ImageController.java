package com.apellikka.fotosoppi.foto_soppi.database;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.hateoas.EntityModel;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import org.springframework.web.bind.annotation.RequestParam;




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

    @GetMapping("/{id}")
    public HttpEntity<Image> getImageById(@PathVariable Integer id) throws IOException {
        
        Image image = imageRepository.findById(id).orElse(null);
        image.add(linkTo(methodOn(ImageController.class).getImageById(id)).withSelfRel());
        image.add(linkTo(methodOn(ImageController.class).serveImage(id)).withRel("image"));
        return new ResponseEntity<Image>(image, HttpStatus.OK);
    }

    @GetMapping("/{id}/raw")
    public ResponseEntity<Resource> serveImage(@PathVariable Integer id) throws IOException {
        Image image = imageRepository.findById(id).orElseThrow(() -> 
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Image ID not found from database!"));
    
        Path imagePath = Paths.get(baseDirectory, image.getPath());
        Resource resource = new UrlResource(imagePath.toUri());
        if (!resource.exists()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image file not found!");
        }
    
        String contentType = Files.probeContentType(imagePath);
        if (contentType == null) {
            contentType = "application/octet-stream"; 
        }
    
        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

    @GetMapping
    public Iterable<Image> findAllImages()
    {
        return this.imageRepository.findAll();
    }

    @PostMapping
    public Image addImage(@RequestBody Image image) 
    {
        return this.imageRepository.save(image);
    }
    
    
}
