package com.apellikka.fotosoppi.foto_soppi.database;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;




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
    public HttpEntity<Image> getImageById(@PathVariable Integer id) {
        
        Image image = imageRepository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Image ID not found from database!"));

        image.add(linkTo(methodOn(ImageController.class).getImageById(id)).withSelfRel());
        image.add(linkTo(methodOn(ImageController.class).serveImage(id)).withRel("image"));
        return new ResponseEntity<Image>(image, HttpStatus.OK);
    }

    @GetMapping("/{id}/raw")
    public ResponseEntity<Resource> serveImage(@PathVariable Integer id)  {
        Image image = imageRepository.findById(id).orElseThrow(() -> 
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Image ID not found from database!"));
    
        Path imagePath = Paths.get(baseDirectory, image.getPath());
        Resource resource = getResourceFromPath(imagePath);
        String contentType = getContentType(imagePath);
    
        return ResponseEntity
        .ok()
        .contentType(MediaType.parseMediaType(contentType))
        .body(resource);
    }

    @GetMapping("/all")
    public HttpEntity<PagedModel<EntityModel<Image>>> findAllImages(
        Pageable pageable, 
        PagedResourcesAssembler<Image> assembler)
    {
        Page<Image> images = imageRepository.findAll(pageable);
        images.forEach(i -> 
            i.add(linkTo(methodOn(ImageController.class).getImageById(i.getId())).withSelfRel())
        );
        PagedModel<EntityModel<Image>> pagedModel = assembler.toModel(images);
        
        return ResponseEntity.ok(pagedModel);
    }

    
    
    // Utils
    private Resource getResourceFromPath(Path imagePath) {
        try {
            Resource resource = new UrlResource(imagePath.toUri());
            if (!resource.exists()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image file not found!");
            }
            return resource;
        } catch (MalformedURLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Malformed URL for image resource", e);
        }
    }

    private String getContentType(Path imagePath) {
        try {
            String contentType = Files.probeContentType(imagePath);
            return contentType != null ? contentType : "application/octet-stream";
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to determine content type", e);
        }
    }
}