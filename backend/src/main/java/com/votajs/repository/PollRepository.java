package com.votajs.repository;

import com.votajs.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {
    void deleteAllByAuthor(String author);
    List<Poll> findByAuthor(String author);
}