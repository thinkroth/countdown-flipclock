(function()
{
    var FlipClock =
    {
        updateTime: function updateTime ()
        {
            // Get the current time and work out 12 hour time
            var date = new Date();
            var difference = (countdownTo.getTime() - date.getTime()) / 1000;

            if (isNaN(difference) || difference <= 0)
            {
                return false;
            }

            var days  = Math.floor(difference / 86400);
            var hours = Math.floor((difference % 86400) / 3600);
            var mins  = Math.floor((difference % 3600) / 60);
            var secs  = Math.floor(difference % 60);

            // Update the clock elements
            FlipClock.changeValue($('#d1'), Math.floor(days / 10));
            FlipClock.changeValue($('#d2'), days % 10);
            FlipClock.changeValue($('#h1'), Math.floor(hours / 10));
            FlipClock.changeValue($('#h2'), hours % 10);
            FlipClock.changeValue($('#m1'), Math.floor(mins / 10));
            FlipClock.changeValue($('#m2'), mins % 10);
            FlipClock.changeValue($('#s1'), Math.floor(secs / 10));
            FlipClock.changeValue($('#s2'), secs % 10);

            return true;
        },
        changeValue: function changeValue (obj, newValue)
        {
            // If the div has no value yet, then just set it immediately
            var value = $('.value', obj).text();

            if (value == '')
            {
                return $('.value', obj).html(newValue);
            }

            // Only do anything if the value has actually changed
            if (value == newValue)
            {
                return;
            }

            // Add top/bottom elements to flip
            $('<div class="top change"><div class="card">'+value+'</div></div>').appendTo(obj);
            $('<div class="bottom change"><div class="bottom"><div class="card">'+newValue+'</div></div></div>').appendTo(obj);
            $('<div class="new-top top"><div class="card">'+newValue+'</div></div>').appendTo(obj);

            // As soon as the flip elements are added to the DOM, fire the CSS animation
            window.setTimeout(function ()
            {
                $('.change', obj).addClass('flip');
            }, 10);

            // After 600ms, cleanup the transitional elements
            window.setTimeout(function ()
            {
                obj.find('.value').html(newValue);
                $('.change', obj).remove();
                $('.new-top', obj).remove();
            }, 600);
        }
    };

    var date        = $.url.param('date');
    var what        = $.url.param('what') || 'Something Neat';
    var countdownTo = new Date(date);

    if (date !== undefined)
    {
        $('#title-what').html('Countdown To ' + what);

        if (FlipClock.updateTime())
        {
            var text = what + ' - ' + date_format("F jS, Y", countdownTo);
            $('#takes-place').html(text);
            document.title = 'Countdown to ' + text;
            window.setInterval(FlipClock.updateTime, 1000);
        }
    }
})();
