window.addEventListener("load", function() {
    const form = document.getElementById('google_form');
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
        method: 'POST',
        body: data,
        });
        })
    });
});