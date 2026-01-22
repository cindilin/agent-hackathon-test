fetch('flags.json?t=' + new Date().getTime())
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('dashboard');

    // Update stats
    document.getElementById('teamCount').textContent = Object.keys(data.teams).length;
    document.getElementById('milestoneCount').textContent = data.milestones.length;

    // Header row
    const header = document.createElement('tr');
    header.innerHTML = '<th>Team</th>' + data.milestones.map(m => `<th>${m}</th>`).join('');
    table.appendChild(header);

    let winningTeams = [];
    let totalCompleted = 0;

    // Team rows
    Object.entries(data.teams).forEach(([team, info]) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td><strong>${team}</strong><br/><small>${info.agent}</small></td>`;

      let teamComplete = true;

      info.flags.forEach(flagObj => {
        const cell = document.createElement('td');
        if (flagObj.completed) {
          cell.className = 'completed';
          cell.innerHTML = `✅<span class='timestamp'>${flagObj.timestamp}</span>`;
          totalCompleted++;
        } else {
          cell.className = 'pending';
          cell.textContent = '⏳';
          teamComplete = false;
        }
        row.appendChild(cell);
      });

      if (teamComplete && info.flags.length > 0) {
        // Get the latest timestamp from this team's completed flags
        const completionTime = Math.max(...info.flags.map(f => f.timestamp ? new Date(f.timestamp).getTime() : 0));
        winningTeams.push({ name: team, completionTime: completionTime });
      }

      table.appendChild(row);
    });

    // Update completed count
    document.getElementById('completedCount').textContent = totalCompleted;

    // Update last update time
    document.getElementById('lastUpdate').textContent = new Date().toLocaleString();

    // Show crown icon if any team completed all milestones
    const winnerIcon = document.getElementById('winnerIcon');
    const winnerTooltip = document.getElementById('winnerTooltip');
    
    if (winningTeams.length > 0) {
      // Sort teams by completion time (earliest first)
      winningTeams.sort((a, b) => a.completionTime - b.completionTime);
      
      winnerIcon.classList.remove('hidden');
      
      // Build leaderboard HTML
      let leaderboardHTML = '<div class="leaderboard-title">🏆 Congratulations On Reaching The End!</div>';
      winningTeams.forEach((team, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎖️';
        const timeStr = new Date(team.completionTime).toLocaleString();
        leaderboardHTML += `<div class="leaderboard-entry">${medal} <strong>${team.name}</strong><span class="completion-time">${timeStr}</span></div>`;
      });
      
      winnerTooltip.innerHTML = leaderboardHTML;
      
      // Toggle tooltip on click
      winnerIcon.onclick = function() {
        winnerTooltip.classList.toggle('hidden');
      };
      
      // Hide tooltip when clicking elsewhere
      document.addEventListener('click', function(e) {
        if (!winnerIcon.contains(e.target)) {
          winnerTooltip.classList.add('hidden');
        }
      });
    }
  });