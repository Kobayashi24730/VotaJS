package com.exemplo.votajs.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;
import lombok.*;


@Entity
@Table(name = "tb_polls")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Poll {
    @id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String question;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.All, orphanRemoval = true)
    private List<Option> options = new ArrayList<>();
}
