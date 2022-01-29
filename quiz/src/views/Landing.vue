<template>
    <div id="bodyLanding">
        <div id="mainLanding">Welcome to the Quiz App!<br> <router-link to="/quiz">Go to the quiz</router-link> </div>
    </div>
</template>

<style>
#mainLanding {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    padding: 1em;
    color: white;
}

#bodyLanding {
    background-color: grey;
    height: 100vh;
    width: 100vw;
    margin: 0;
    background-image: url("../../assets/background.png");
}

* {
    margin: 0;
}
</style>