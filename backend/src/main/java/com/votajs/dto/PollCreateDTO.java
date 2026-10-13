package com.votajs.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.List;
@Getter
@Setter
public class PollCreateDTO {
    private Long id;
    private String question;
    private String author;
    private LocalDateTime date;
    private String description;
    private String descriptionTitle;
    private Integer votesCount;
    private List<OptionDTO> options;
    private Set<String> votedEmails;
}
