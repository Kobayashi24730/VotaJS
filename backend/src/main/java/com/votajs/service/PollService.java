package com.votajs.service;

import com.votajs.model.Option;
import com.votajs.model.Poll;
import com.votajs.repository.OptionRepository;
import com.votajs.repository.PollRepository;
import com.votajs.controller.PollStreamController;
import com.votajs.dto.PollCreateDTO;
import com.votajs.dto.OptionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import javax.management.RuntimeMBeanException;
import java.util.stream.Collectors;

@Service
public class PollService {
    private final PollRepository pollRepository;
    private final OptionRepository optionRepository;
    private final PollStreamController pollStreamController;

    private PollCreateDTO ConvertToDTO(Poll poll) {
        PollCreateDTO dto = new PollCreateDTO();
        dto.setId(poll.getId());
        dto.setQuestion(poll.getQuestion());
        dto.setAuthor(poll.getAuthor());
        dto.setDate(poll.getDate());
        dto.setDescription(poll.getDescription());
        dto.setDescriptionTitle(poll.getDescriptionTitle());
        dto.setVotesCount(poll.getVotesCount());
        dto.setVotedEmails(poll.getVotedEmails());
        List<OptionDTO> options = poll.getOptions().stream().map(o -> {
            OptionDTO optionDTO = new OptionDTO();
            optionDTO.setId(o.getId());
            optionDTO.setText(o.getText());
            optionDTO.setVotes(o.getVotes().intValue());
            return optionDTO;
        }).toList();

        dto.setOptions(options);
        return dto;
    }

    public PollService(PollRepository pollRepository, OptionRepository optionRepository, PollStreamController pollStreamController) {
        this.pollRepository = pollRepository;
        this.optionRepository = optionRepository;
        this.pollStreamController = pollStreamController;
    }

    public List<PollCreateDTO> getAllPolls() {
        return pollRepository.findAll().stream().map(this::ConvertToDTO).collect(Collectors.toList());
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

    //? Logica para o usuario apagar uma enquete.
    @Transactional
    public void deletePoll(Long pollId, String userEmail) {
        Poll poll = pollRepository.findById(pollId).orElseThrow(() -> new RuntimeException("Enquete nao encontrada."));
        if (!poll.getAuthor().equals(userEmail)) {
            throw new RuntimeException("Não tens permissão para apagar esta enquete.");
        }
        pollRepository.delete(poll);
    }

    @Transactional
    public boolean vote(Long pollId, Long optionId, String userEmail) {
        Poll poll = getPollById(pollId);

        //? Verifica se a lista de email nao e nula.
        if (poll.getVotedEmails() == null) {
            poll.setVotedEmails(new HashSet<>());
        }
        //? Se o email ja votou nessa enquete retorna ture.
        if(poll.getVotedEmails().contains(userEmail)){
            return true;
        }

        Option option = optionRepository.findById(optionId).orElseThrow(()  -> new RuntimeException("Opção nao encontrada."));
        if (!option.getPoll().getId().equals(poll.getId())) {
            throw new RuntimeException("Opção nao pertence a essa enquete.");
        }

        //? Parte dos votos.
        option.setVotes(option.getVotes() + 1);
        optionRepository.save(option);
        poll.setVotesCount(poll.getVotesCount() + 1);

        //? Adiciona o email do ultilizador na lista de votos.
        poll.getVotedEmails().add(userEmail);
        pollRepository.save(poll);

        //? para atualizar todos os clients da atualização dos votos.
        Poll updatePoll = getPollById(pollId);
        pollStreamController.notifyAllClients(updatePoll);
        return false; //? retorna false para o front saber que o voto foi contabilizado.
    }
}
