fetch('flags.json')
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

    let anyTeamComplete = false;
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
        anyTeamComplete = true;
      }

      table.appendChild(row);
    });

    // Update completed count
    document.getElementById('completedCount').textContent = totalCompleted;

    // Update last update time
    document.getElementById('lastUpdate').textContent = new Date().toLocaleString();

    // Show celebration if any team completed all milestones
    if (anyTeamComplete) {
      document.getElementById('celebration').classList.remove('hidden');
    }
  });