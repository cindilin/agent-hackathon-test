fetch('flags.json')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('dashboard');

    // Header row
    const header = document.createElement('tr');
    header.innerHTML = '<th>Team</th>' + data.milestones.map(m => `<th>${m}</th>`).join('');
    table.appendChild(header);

    // Team rows
    Object.entries(data.teams).forEach(([team, info]) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td><strong>${team}</strong><br/><small>${info.agent}</small></td>`;

      info.flags.forEach(flag => {
        const cell = document.createElement('td');
        cell.className = flag ? 'completed' : 'pending';
        cell.textContent = flag ? '✅' : '⏳';
        row.appendChild(cell);
      });

      table.appendChild(row);
    });
  });