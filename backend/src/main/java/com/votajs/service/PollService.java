package com.votajs.service;

import com.votajs.model.Option;
import com.votajs.model.Poll;
import com.votajs.repository.OptionRepository;
import com.votajs.repository.PollRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import javax.management.RuntimeMBeanException;

@Service
public class PollService {
    private final PollRepository pollRepository;
    private final OptionRepository optionRepository;

    public PollService(PollRepository pollRepository, OptionRepository optionRepository) {
        this.pollRepository = pollRepository;
        this.optionRepository = optionRepository;
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Poll getPollById(Long id) {
        return pollRepository.findById(id).orElseThrow(() -> new RuntimeException("Enquete não encontrada."));
    }

    @Transactional
    public Poll createPoll(Poll poll) {
        if (poll.getOptions() != null) {
            poll.getOptions().forEach(option -> option.setPoll(poll));
        }
        return pollRepository.save(poll);
    }

    @Transactional
    public void vote(Long pollId, Long optionId) {
        Poll poll = getPollById(pollId);
        Option option = optionRepository.findById(optionId).orElseThrow(()  -> new RuntimeException("Opção nao encontrada."));
        if (!option.getPoll().getId().equals(poll.getId())) {
            throw new RuntimeException("Opção nao pertence a essa enquete.");
        }
        option.setVotes(option.getVotes() + 1);
        optionRepository.save(option);
    }
}
