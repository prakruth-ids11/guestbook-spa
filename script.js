const form = document.querySelector('form');
const messageList = document.querySelector('#messages');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent page reload

    const name = form.name.value;
    const message = form.message.value;

    if (!name || !message) return alert('Fill both fields!');

    const res = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
    });

    if (res.ok) {
        form.reset();
        loadMessages(); // refresh messages
    } else {
        alert('Error submitting message!');
    }
});

// function to load messages
async function loadMessages() {
    const res = await fetch('/messages');
    const messages = await res.json();

    messageList.innerHTML = '';
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.textContent = `${msg.name}: ${msg.message}`;
        messageList.appendChild(div);
    });
}

// load messages on page load
loadMessages();