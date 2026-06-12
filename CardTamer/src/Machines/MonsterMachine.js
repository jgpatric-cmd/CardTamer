class MonsterMachine {
    constructor() {
        //  The current active moster for the player and enemy
        this.playerMonster = null;     
        this.enemyMonster = null;       

        this.playerDeck = [];           //  Remaining cards to draw
        this.playerHand = [];           //  Cards currently in hand

        this.enemyDeck = [];            //  Enemy's remaining monsters
    }

    //===============================================//
    //  DECK SETUP                                   //
    //===============================================//
    buildDeck(monsterIDs) {
        //  Makes a COPY of the monster ID list and shuffles it
        //  prevents the original deck list from changes
        return [...monsterIDs].sort(() => Math.random() - 0.5);
    }

    setupBattle(playerDeckIDs, enemyDeckIDs) {
        //  Build the decks for the player and enemy
        this.playerDeck = this.buildDeck(playerDeckIDs);
        this.enemyDeck = this.buildDeck(enemyDeckIDs);

        //  Draw initial hand
        for (let i = 0; i < 5; i++) {
            this.drawCard();
        }

        //  Enemy plays first monster from their deck automatically
        const firstEnemyID = this.enemyDeck.shift();
        this.enemyMonster = this.createMonster(firstEnemyID);
    }

    drawCard() {
        //  Stop if the player has no cards left to draw
        if (this.playerDeck.length == 0) {
            console.log("Deck is empty");
            return null;
        }

        //  Remove the first monster ID from the deck
        const monsterID = this.playerDeck.shift();  //  Draw from the top

        //  Create a monster object from the ID
        const monster = this.createMonster(monsterID);

        //  Add the monster to the player's hand
        this.playerHand.push(monster);

        return monster;
    }

    //===============================================//
    //  CREATING A MONSTER                           //
    //===============================================//
    createMonster(monsterID) {
        //  Get the monster's base data from MONSTERS
        const data = MONSTERS[monsterID];

        //  Safety check for monster ID
        if (!data) {
            console.error(`Monster "${monsterID}" not found in MONSTERS data`);
            return null;
        }
        
        //  Create a copy of each move's uses.
        //  Ensures that duplicate monsters do not share the same number of move uses
        const moves = data.moves.map(moveID => ({
            id: moveID,
            uses: MOVES[moveID].uses === Infinity ? Infinity : MOVES[moveID].uses
        }));

        //  Return the monster 
        //  Ensures the data values (health, etc) remain with this instance
        return {
            id: monsterID,
            name: data.name,
            health: data.health,
            maxHealth: data.health,
            speed: data.speed,
            sprite: data.sprite,
            moves,
            statusEffect: null
        };
    }

    //===============================================//
    //  PLAYING A MONSTER                            //
    //===============================================//
    playMonster(monster) {
        //  Remove from hand
        this.playerHand = this.playerHand.filter(m => m !== monster);

        //  Set active
        this.playerMonster = monster;
    }

    //===============================================//
    //  COMBAT                                       //
    //===============================================//

    
    calculateTurnOrder() {
        //  Faster monster goes first
        //  If tie, player goes first
        return this.playerMonster.speed >= this.enemyMonster.speed
        ? ["player", "enemy"]           //  True
        : ["enemy", "player"];          //  False
    }

    calculateDamage(move) {
        return move.power
    }

    executeMove(attackerKey, moveID) {
        //  assign if the player is attacking or defending
        const attacker = attackerKey === "player" ? this.playerMonster : this.enemyMonster;
        const defender = attackerKey === "player" ? this.enemyMonster : this.playerMonster;

        //  Use own moves[] copy
        const attackerMove = attacker.moves.find(m => m.id === moveID);
        const moveData = MOVES[moveID];

        //  Safety check for moveID
        if (!moveData) {
            console.error(`Move "${moveID}" not found in MOVES data`);
            return null;
        }

        //  Stops move from being used if no uses are left
        if (attackerMove.uses <= 0) {
            return { success: false, reason: "No uses left"};
        }

        //  Calculate damage and subtract from defender
        const damage = this.calculateDamage(moveData);
        defender.health = Math.max(0, defender.health - damage);

        //  Only decrement uses if not infinte
        if (moveData.uses !== Infinity) {
            attackerMove.uses--;
        }

        //  Returns to battleScene
        return {
            success: true,
            attacker: attacker.name,
            defender: defender.name,
            moveName: moveData.name,
            damage,
            defenderHealth: defender.health
        };
    }

    //===============================================//
    //  CHECKS                                       //
    //===============================================//
    isFainted(monsterKey) {
        const monster = monsterKey === "player" ? this.playerMonster: this.enemyMonster;
        return monster.health <= 0;
    }

    isPlayerHandEmpty() {
        return this.playerHand.length === 0;
    }

    isPlayerDeckEmpty() {
        return this.playerDeck.length === 0;
    }

    isPlayerDefeated() {
        //  Player active monster is defeated, hand is empty, and no cards in deck
        return this.isFainted("player")
        && this.playerHand.length === 0
        && this.playerDeck.length === 0;
    }

    isEnemyDefeated() {
        //  Active monster is defeated and no cards left in deck
        return this.isFainted("enemy")
        && this.enemyDeck.length === 0;
    }

    //===============================================//
    //  ENEMY AI                                     //
    //===============================================//
    getEnemyMove() {
        //  Only choose moves that still have uses
        const availableMoves = this.enemyMonster.moves.filter(m => m.uses > 0 || m.uses === Infinity);

        //  If all moves are exhausted use the first move anyways
        const moves = availableMoves.length > 0 ? availableMoves : this.enemyMonster.moves;
        if (moves.length == 0) return null;

        //  Pick a random move from the available options
        return moves[Math.floor(Math.random() * moves.length)].id;
    }

    enemyPlayNextMonster() {
        //  Stop if no monsters left
        if (this.enemyDeck.length === 0) return null;

        //  Draw next monster and set it to active
        const nextID = this.enemyDeck.shift();
        this.enemyMonster = this.createMonster(nextID);
        
        return this.enemyMonster;
    }




}