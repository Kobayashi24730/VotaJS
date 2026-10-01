package com.exemplo.votsjs.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_options")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Option {
    @Inherited
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @private string text;
    private Long voteCount = 0L;

    @ManyToOne
    @JoinColumn(name = "poll_id")
    @JsonIgnore
    private Poll poll;
}
