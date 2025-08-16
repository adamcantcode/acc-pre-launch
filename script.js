document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const input = document.getElementById('command');
  const promptEl = document.getElementById('prompt');
  let prompt = 'guest@acc:~$';
  promptEl.textContent = prompt;

  fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
      prompt = `${data.ip}:~$`;
      promptEl.textContent = prompt;
    })
    .catch(() => {});

  const commands = {
    help: `Available commands:\n- about: Who am I\n- projects: Things I've built\n- contact: Get in touch\n- clear: Clear the screen`,
    about: `Adam Cantcode is a developer who enjoys building playful web experiences with a retro twist.`,
    projects: `1. Retro Portfolio - the site you're looking at\n2. Another Project - coming soon`,
    contact: `Email: hello@adamcantcode.com`
  };

  function print(text) {
    const line = document.createElement('div');
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function runCommand(cmd) {
    if (cmd === 'clear') {
      output.innerHTML = '';
      return;
    }
    const response = commands[cmd];
    if (response) {
      response.split('\n').forEach(print);
    } else if (cmd.length > 0) {
      print(`Command not found: ${cmd}`);
    }
  }

  print('Welcome to Adam Cantcode\'s terminal portfolio.');
  print("Type 'help' to see available commands.");

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      print(`${prompt} ${cmd}`);
      runCommand(cmd);
      input.value = '';
    }
  });
});
