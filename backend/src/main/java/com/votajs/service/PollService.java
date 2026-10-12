package com.votajs.service;

import com.votajs.model.Option;
import com.votajs.model.Poll;
import com.votajs.repository.OptionRepository;
import com.votajs.repository.PollRepository;
import com.votajs.controller.PollStreamController;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import javax.management.RuntimeMBeanException;

@Service
public class PollService {
    private final PollRepository pollRepository;
    private final OptionRepository optionRepository;
    private final PollStreamController pollStreamController;

    public PollService(PollRepository pollRepository, OptionRepository optionRepository, PollStreamController pollStreamController) {
        this.pollRepository = pollRepository;
        this.optionRepository = optionRepository;
        this.pollStreamController = pollStreamController;
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
        //? Salva o poll para pegar o id gerado seja guardado e so depois atualiza.
        Poll savePoll = pollRepository.save(poll);
        pollStreamController.notifyAllClients(savePoll);
        return savePoll;
    }

    @Transactional
    public boolean vote(Long pollId, Long optionId, String userEmail) {
        Poll poll = getPollById(pollId);

        //? Verifica se a lista de email nao e nula.
        if (poll.getVoteEmails() == null) {
            poll.setVotedEmails(new HashSet<>());
        }

        //? Se o email ja votou nessa enquete retorna ture.
        if(poll.getVoteEmails().contains(userEmail)){
            return true;
        }

        Option option = optionRepository.findById(optionId).orElseThrow(()  -> new RuntimeException("Opção nao encontrada."));
        if (!option.getPoll().getId().equals(poll.getId())) {
            throw new RuntimeException("Opção nao pertence a essa enquete.");
        }

        option.setVotes(option.getVotes() + 1);
        optionRepository.save(option);

        //? Adiciona o email do ultilizador na lista de votos.
        poll.getVoteEmails().add(userEmail);
        pollRepository.save(poll);

        //? para atualizar todos os clients da atualização dos votos.
        Poll updatePoll = getPollById(pollId);
        pollStreamController.notifyAllClients(updatePoll);
        return false; //? retorna false para o front saber que o voto foi contabilizado.
    }
}
