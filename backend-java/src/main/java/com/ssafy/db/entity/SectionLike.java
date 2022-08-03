package com.ssafy.db.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Getter
@Setter
public class SectionLike{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int like_id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "sec_id")
    private Section section;

}
