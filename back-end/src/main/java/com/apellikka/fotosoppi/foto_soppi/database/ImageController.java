package com.apellikka.fotosoppi.foto_soppi.database;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



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
        public ResponseEntity<Resource> getImageById(@PathVariable Integer id) throws MalformedURLException 
        {
            Image image = imageRepository.findById(id)
                .orElse(null);
            
            if(image == null)
            {
                System.err.println("ERROR: Image ID not found from DB!");
                return ResponseEntity.notFound()
                .header("Message", "Image not found with ID")
                .build();
            }
        
            Path imagePath = Paths.get(baseDirectory, image.getPath());
            Resource resource = new UrlResource(imagePath.toUri());
            if(!resource.exists())
            {
                System.err.println("ERROR: Image file not found from disk!");
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok().body(resource);
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
