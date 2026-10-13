package com.votajs.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OptionDTO {
    private Long id;
    private String text;
    private Integer votes;
}
