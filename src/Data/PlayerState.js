const PLAYER_STATE = {
    deck: [],       //  monster IDs going to next battle
    food: 3,        //  starting food
    owned: [],       //  caught monsters
    currentLevel: 0,

    //  Add a monster to the deck
    addToDeck(monsterID) {
        this.deck.push(monsterID);
    },

    //  Add a caught monster to owned and deck
    catchMonster(monsterID) {
        this.owned.push(monsterID);
        this.deck.push(monsterID);
    },

    //  Food usage
    spendFood(amount = 1) {
        if (this.food < amount) {
            return false;
        }
        this.food -= amount;
        return true;
    },

    //  Rewards
    //  Add food
    addFood(amount) {
        this.food += amount;
    },

    advanceLevel() {
        this.currentLevel++;
    },

    isLastLevel() {
        return this.currentLevel >= ENEMY_DECKS.length - 1;
    },

    getCurrentEnemyDeck() {
        return ENEMY_DECKS[this.currentLevel];
    },

    //  Reset between runs
    reset() {
        this.deck = [];
        this.food = 3;
        this.owned = [];
        this.currentLevel = 0;
    }
};