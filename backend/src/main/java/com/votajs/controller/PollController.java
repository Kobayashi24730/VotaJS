package com.votajs.controller;

import com.votajs.model.Poll;
import com.votajs.service.PollService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polls")
@CrossOrigin(origins = "http://localhost:5173")
public class PollController {

    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    // GET /api/polls -> Lista todas as enquetes
    @GetMapping
    public ResponseEntity<List<Poll>> getAllPolls() {
        return ResponseEntity.ok(pollService.getAllPolls());
    }

    // GET /api/polls/{id} -> Busca uma enquete pelo id
    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPollById(@PathVariable Long id) {
        return ResponseEntity.ok(pollService.getPollById(id));
    }

    // POST /api/polls -> Cria uma nova enquete
    @PostMapping
    public ResponseEntity<Poll> createPoll(@RequestBody Poll poll) {
        Poll createdPoll = pollService.createPoll(poll);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPoll);
    }

    // POST /api/polls/{pollId}/vote -> Registra um voto
    @PostMapping("/{pollId}/vote")
    public ResponseEntity<Void> vote(@PathVariable Long pollId, @RequestParam Long optionId) {
        pollService.vote(pollId, optionId);
        return ResponseEntity.ok().build();
    }
}