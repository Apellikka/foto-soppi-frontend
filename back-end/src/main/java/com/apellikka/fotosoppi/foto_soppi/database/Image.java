package com.apellikka.fotosoppi.foto_soppi.database;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "images")
public class Image {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String path;

    public Image() {}

    public Image(Integer id, String path) 
    {
        this.id = id;
        this.path = path;
    }

    public Integer getId()
    {
        return this.id;
    }

    public String getPath()
    {
        return this.path;
    }
}
