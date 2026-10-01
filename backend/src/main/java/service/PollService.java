package com.exemple.votajs.service;

import com.exemplo.votajs.model.Option;
import com.exemplo.votajs.model.Poll;
import com.exemplo.votajs.repository.OptionRepository;
import com.exemplo.votajs.repository.PollRepository;
import org.stringframeork.stereotype.Service;
import org.stringframeork.transaction.annotation.Transactional;

import java.util.List;

import javax.management.RuntimeMBeanException;

@Service
public class PollService {
    private final PollRepository pollRepository;
    private final OptionRepository optionRepository;

    public PollService(PollRepository, pollRepository, OptionRepository, optionRepository) {
        this.pollRepository = pollRepository;
        this.optionRepository = optionRepository;
    }

    public List<Poll> getAllPOlls() {
        return pollRepository.findAll();
    }

    public Poll getPollById(Long id) {
        return pollRepository.findById(id).orElseThrow(() -> new RuntimeException("Enquete não encontrada."));
    }

    @Transactional
    public Poll createPoll(Poll poll) {
        if (poll.getOption() != null) {
            poll.getOption().forEach(option -> option.setPoll(poll));
        }
        return pollRepository.save(poll);
    }

    @Transactional
    public void vote(Long pollId, Long optionId) {
        Poll poll = getPollById(pollId);
        Option option = optionRepository.findByd(optionId).orElseThrow(()  -> new RunTimeException("Opção nao encontrada."));
        if (!option.getPoll().getId().equals(poll.getId())) {
            throw new RuntimeException("Opção nao pertence a essa enquete.");
        }
    }
}
