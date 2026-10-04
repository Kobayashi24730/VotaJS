

/** 
 * @param {Array} polls
 * @param {string} search
 * @param {object} activeFilter
 * @param {string} sortBy
 * @returns {Array}
 */

export function filtered( polls = [], search = "", sortBy = {}, activeFilter = "Todos") {
    if (!polls) return [];

    let result = polls.filter((poll) => {
      const term = search.toLowerCase();
      const question = poll.question?.toLowerCase().includes(term);
      const description = poll.description?.toLowerCase().includes(term);
      const tilematch = poll.descriptionTitle?.toLowerCase().includes(term);
      const matchesSearch = question || description || tilematch;

      const matchesCategory = activeFilter.category ? poll.question?.toLowerCase() === activeFilter.category.toLowerCase() : true;
      const totalVotes = poll.votesCount || 0;
      let matchesVoteRange = true;
      if (activeFilter.voteRange === "under-50") {
        matchesVoteRange = totalVotes <= 50;
      } else if (activeFilter.voteRange === "over-50") {
        matchesVoteRange = totalVotes > 50;
      }

      return matchesSearch && matchesCategory && matchesVoteRange;
    });

    if (sortBy === "popular") {
      result = [...result].sort((a, b) => (b.votesCount || 0) - (a.votesCount || 0));
    } else if (sortBy === "date") {
      result = result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
};