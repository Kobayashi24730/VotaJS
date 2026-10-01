package com.exemplo.votajs.repository;

import com.exemplo.votajs.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public class PollRepository extends JpaRepository<Poll, Long>{
    
}
