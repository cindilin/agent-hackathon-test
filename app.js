fetch('flags.json')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('dashboard');

    // Header row
    const header = document.createElement('tr');
    header.innerHTML = '<th>Team</th>' + data.milestones.map(m => `<th>${m}</th>`).join('');
    table.appendChild(header);

    let allComplete = false;

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
        } else {
          cell.className = 'pending';
          cell.textContent = '⏳';
          teamComplete = false;
        }
        row.appendChild(cell);
      });

      if (teamComplete) { allComplete = true; }

      table.appendChild(row);
    });

    // Show celebration if all milestones done
    if (allComplete) {
      document.getElementById('celebration').classList.remove('hidden');
    }
  });