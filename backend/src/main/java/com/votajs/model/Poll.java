package com.votajs.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;
import lombok.*;


@Entity
@Table(name = "tb_polls")
@Getter
@Setter
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String question;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Option> options = new ArrayList<>();
}
