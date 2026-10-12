package com.votajs.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


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

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private LocalDateTime date = LocalDateTime.now();

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false, length = 300)
    private String descriptionTitle;

    @Column(nullable = false)
    private Integer votesCount = 0;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Option> options = new ArrayList<>();

    //? Logica para guardar os emails que ja votaram em uma determinada enquete.
    @ElementCollection
    private Set<String> votedEmails = new HashSet<>();
    public Set<String> getVoteEmails() { return votedEmails; }
    public void setVotedEmails(Set<String> votedEmails) { this.votedEmails = votedEmails; }
}
