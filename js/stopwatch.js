function Stopwatch(elem) {
    var time = 0;
    var timeStart = new Date(time);
    var interval;
    var offset;

    function update() {
        time += delta();
        var formattedTime = timeFormatter(time);
        elem.textContent = formattedTime;
    }

    function delta() {
        var now = Date.now();
        var timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    function timeFormatter(timeInMilliseconds) {
        var time = new Date(timeInMilliseconds);
        var hours = time.getHours().toString() - timeStart.getHours().toString();
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var milliseconds = time.getMilliseconds().toString();

        if(minutes.length < 2) {
            minutes = '0' + minutes;
        }

        if(seconds.length < 2) {
            seconds = '0' + seconds;
        }

        while (milliseconds.length < 3) {
            milliseconds = '0' + milliseconds
        }
        
        return hours + ' : ' +  minutes + ' : ' + seconds + ' . ' + milliseconds;
    }

    this.isOn = false;

    this.start = function() {
        if (!this.isOn){
            interval = setInterval(update, 10);
            offset = Date.now();
            this.isOn = true;
        }
    };

    this.stop = function() {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    };

    this.reset = function() {
        time = 0;
        elem.textContent = '0 : 00 : 00 . 000'
    };
}