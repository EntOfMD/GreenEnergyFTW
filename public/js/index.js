$(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('.rescrape').click(() => {
        setTimeout(() => {
            location.reload();
        }, 3000);
    });

    $('#pullForm').click(() => {
        $('#addCarouselCard').show('slow');
    });

    const $submit = $('#submit');
    const poster = $('#poster'),
        url = $('#img'),
        title = $('#title');

    const API = {
        post: function(info) {
            return $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: 'POST',
                url: '/api/addCarousel',
                data: info
            });
        }
    };

    const handleFormSubmit = event => {
        event.preventDefault();

        const cImg = {
            poster: poster.val().trim(),
            url: url.val().trim(),
            title: title.val().trim()
        };

        if (!poster || !url || !title) {
            alert('Make sure ALL the fields are filled! :)');
            return;
        }
    };
});
