$(() => {
    $("#dot").animate({
        width: "80vh",
        height: "80vh",
    });
    setTimeout(function () {
        $("<h3>Click Me!</h3>").hide().appendTo("#dot").fadeIn();
    }, 2000);
    // Load the game page when the dot is clicked
    $("#dot").on("click", loadPage);
    function loadPage() {
        $("#dotter").fadeOut();
        $(
            '<div class="row mt-3 row-cols-1 row-cols-lg-2">' +
                '<div class="col col-lg-4 col-xl-5">' +
                '<a href="https://www.headspace.com/" target="blank">' +
                '<div class="text-center border-orange" id="title">' +
                "<h1>Headspace Memory</h1></div></a>" +
                '<div class="border-orange" id="settings">' +
                '<div class="border-orange" id="first">' +
                '<div id="difficulty">' +
                "<h3>Seleziona la difficoltà:</h3>" +
                '<button class="button" type="button">Facile</button>' +
                '<button class="button" type="button">Normale</button>' +
                '<button class="button" type="button">Difficile</button></div>' +
                '<div id="moves" style="opacity: 0">' +
                '<h3>Numero di mosse: <span id="clicks"></span></h3>' +
                '<h3>Limite di mosse: <span id="maxClicks"></span></h3>' +
                '<h3>Tempo: <br /><span id="timer"></span></h3></div></div>' +
                '<div class="border-orange" id="second">' +
                '<h3>Combo: <span id="combo"></span></h3>' +
                '<h3>Punteggio: <span id="points"></span></h3></div>' +
                '<input type="button" class="button" value="Ricomincia" />' +
                '</div></div><div class="col col-lg-8 col-xl-7" id="game">' +
                '<div class="border-orange" id="griglia"></div></div></div>'
        )
            .hide()
            .appendTo(".container")
            .fadeIn(1500);
        // Reset the moves banner opacity when the document is ready
        $("#moves").hide().css({
            opacity: "1",
        });
        // Difficulty buttons and event functions
        $(".button:contains('Facile')").on("click", startEasy);
        function startEasy() {
            startGame(lv1, "easy");
        }
        $(".button:contains('Normale')").on("click", startNormal);
        function startNormal() {
            startGame(lv1, "normal");
        }
        $(".button:contains('Difficile')").on("click", startHard);
        function startHard() {
            startGame(lv1, "hard");
        }
    }
    // Global variables declaration
    let card;
    let findCount = [];
    let compCard = [];
    let maxClick;
    let level;
    let pts;
    let clicks;
    let points;

    // Array level one
    const lv1 = [
        "day",
        "day",
        "night",
        "night",
        "juggle",
        "juggle",
        "mind",
        "mind",
        "music",
        "music",
        "search",
        "search",
        "tempest",
        "tempest",
        "think",
        "think",
    ];

    // Starting Game function
    function startGame(stage, difficulty) {
        // Local variables declaration
        compCard = [];
        findCount = [];
        level = stage.length;
        let random = shuffle(stage);
        // Creates and adds the cards to the playground
        for (var i = 0; i < level; i++) {
            $(
                '<div class="box"><img src="assets/img/' +
                    random[i] +
                    '.png"/> </div>'
            )
                .css({
                    width: "22%",
                    height: "22%",
                })
                .appendTo("#griglia");
        }
        // Change points and maxClicks values and the
        // back side of the cards according to the difficulty
        switch (difficulty) {
            case "easy":
                $(".box").addClass("bg1");
                maxClick = level * 3;
                pts = 50;
                break;
            case "normal":
                $(".box").addClass("bg2");
                maxClick = level * 2;
                pts = 100;
                break;
            case "hard":
                $(".box").addClass("bg3");
                maxClick = level * 1.5;
                pts = 200;
        }
        // Starts the timer and change the banner from difficulty to moves
        startTimer();
        $("#moves").show();
        $("#difficulty").hide();
        // Set all the counters to zero
        $("#combo").html(0);
        $("#clicks").html(0);
        $("#points").html(0);
        // Set the maxClick to the limit
        $("#maxClicks").html(maxClick);
        // Active the restart button
        $("input.button").on("click", restart);
        // Active the events on the cards
        card = $(".box").children();
        $(card).each(function () {
            $(this).on("click", displayImg);
            $(this).on("click", openModal);
        });
    }

    // Cards shuffle function
    function shuffle(a) {
        var currentIndex = a.length;
        var temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = a[currentIndex];
            a[currentIndex] = a[randomIndex];
            a[randomIndex] = temporaryValue;
        }
        return a;
    }

    // Display cards on click function
    function displayImg() {
        // Adds the card into the comparative array
        compCard.push(this);
        // Shows and disables the card when clicked
        $(this).addClass("show");
        $(this).parent().addClass("disabled");
        // Local variables declarations
        clicks = parseInt($("#clicks").html(), 10);
        points = parseInt($("#points").html(), 10);
        let combo = parseInt($("#combo").html(), 10);
        let arr1 = $(compCard[0]);
        let arr2 = $(compCard[1]);
        let len = $(compCard).length;
        // Increases clicks counter
        $("#clicks").html(clicks + 1);
        // When two cards are clicked
        if (len === 2) {
            // If the cards matches adds the find class
            if ($(arr1).attr("src") === $(arr2).attr("src")) {
                $(arr1).addClass("find");
                $(arr2).addClass("find");
                // Increases combo and points counter
                $("#combo").html((combo += 1));
                $("#points").html(points + pts * combo);
                // Adds the couple to the counter of findCount
                findCount.push(compCard);
                compCard = [];
            } else {
                // Resets combo counter
                $("#combo").html(combo * 0);
                // Disables the click on other cards
                $(card).each(function () {
                    $(this).parent().addClass("disabled");
                });
                // Hides the cards after 6 seconds
                setTimeout(function () {
                    $(arr1).removeClass("show");
                    $(arr2).removeClass("show");
                    // Remove disable on the cards
                    $(card).each(function () {
                        $(this).parent().removeClass("disabled");
                    });
                    // Keep disabled on found cards
                    $(".find").each(function () {
                        $(this).parent().addClass("disabled");
                    });
                }, 600);
                compCard = [];
            }
        }
    }

    //IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    //IMPLEMENTAZIONI
    //IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    function startTimer() {
        $("#timer").html("0 min 0 sec");
        var s = 0,
            m = 0,
            h = 0;
        interval = setInterval(function () {
            $("#timer").html(m + " min " + s + " sec");
            s++;
            if (s == 60) {
                m++;
                s = 0;
            }
            if (m == 60) {
                h++;
                m = 0;
            }
        }, 1000);
    }

    function restart() {
        clearInterval(interval);
        // Remove the game and the modals
        $(".box").remove();
        $(".content").remove();
        // Change the banner from moves to difficulty
        $("#moves").hide();
        $("#difficulty").show();
        // Clear the counters
        $("#clicks").html("");
        $("#maxClicks").html("");
        $("#timer").html("");
        $("#combo").html("");
        $("#points").html("");
    }

    function openModal() {
        clicks = parseInt($("#clicks").html(), 10);
        points = parseInt($("#points").html(), 10);
        if (findCount.length == level / 2) {
            console.log(points);
            console.log(maxClick);
            console.log(clicks);
            $(
                "<div class='content'>" +
                    "<h2>Congratulazioni! Hai risolto il gioco in: </h2>" +
                    '<h2><span id="time"> </span> con <span id="mosse"> </span></h2>' +
                    '<h2>Punteggio finale: <span id="record"></span></h2>' +
                    '<p><input type="button" class="button" value="Altra partita"></p></div>'
            )
                .css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    position: "fixed",
                    opacity: "0",
                    top: "0",
                    left: "0",
                })
                .appendTo(".container")
                .animate(
                    {
                        opacity: "1",
                    },
                    1000
                );
            clearInterval(interval);
            $("#time").html($("#timer").html());
            $("#mosse").html($("#clicks").text() + " mosse");
            $("#record").html(points + pts * (maxClick - clicks) + "pts");
            $("input.button").on("click", restart);
        } else if ($("#clicks").html() == maxClick) {
            $(
                "<div class='content'>" +
                    "<h2>Peccato! Hai raggiunto il limite di mosse!</h2>" +
                    '<h2>Punteggio: <span id="record"></span></h2>' +
                    '<p><input type="button" class="button" value="Altra partita"></p></div>'
            )
                .css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    position: "fixed",
                    opacity: "0",
                    top: "0",
                    left: "0",
                })
                .appendTo(".container")
                .animate(
                    {
                        opacity: "1",
                    },
                    1000
                );
            clearInterval(interval);
            $("#record").html(points + "pts");
            $("input.button").on("click", restart);
        }
    }
});
