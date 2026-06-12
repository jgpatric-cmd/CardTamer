class MonsterMachine {
    constructor() {
        this.playerMonster = null;      //  Active monster
        this.enemyMonster = null;       //  Active monster

        this.playerDeck = [];           //  Remaining cards to draw
        this.playerHand = [];           //  Cards currently in hand

        this.enemyDeck = [];            //  Enemy's remaining monsters
    }

    //===============================================//
    //  DECK SETUP                                   //
    //===============================================//
    buildDeck(monsterIDs) {
        //  Shuffle a copy of the provided ID array
        return [...monsterIDs].sort(() => Math.random() - 0.5);
    }

    setupBattle(playerDeckIDs, enemyDeckIDs) {
        this.playerDeck = this.buildDeck(playerDeckIDs);
        this.enemyDeck = this.buildDeck(enemyDeckIDs);

        //  Draw initial hand
        for (let i = 0; i < 5; i++) {
            this.drawCard();
        }

        //  Enemy plays first monster from their deck automatically
        const firstEnemyID = this.enemyDeck.shift();
        // console.log("First enemy ID:", firstEnemyID);                   //  TEST
        this.enemyMonster = this.createMonster(firstEnemyID);
        // console.log("Enemy Monster: ", this.enemyMonster);              //  TEST
    }

    drawCard() {
        if (this.playerDeck.length == 0) {
            console.log("Deck is empty");
            return null;
        }

        const monsterID = this.playerDeck.shift();  //  Draw from the top
        const monster = this.createMonster(monsterID);
        this.playerHand.push(monster);
        return monster;
    }

    //===============================================//
    //  CREATING A MONSTER                           //
    //===============================================//
    createMonster(monsterID) {
        const data = MONSTERS[monsterID];

        if (!data) {
            console.error(`Monster "${monsterID}" not found in MONSTERS data`);
            return null;
        }
        
        //  Copy the moves so the usage in the orginal is not messed up
        const moves = data.moves.map(moveID => ({
            id: moveID,
            uses: MOVES[moveID].uses === Infinity ? Infinity : MOVES[moveID].uses
        }));

        //  Return a copy
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

    //  Faster monster goes first
    calculateTurnOrder() {
        return this.playerMonster.speed >= this.enemyMonster.speed
        ? ["player", "enemy"]           //  True
        : ["enemy", "player"];          //  False
    }

    calculateDamage(move) {
        return move.power
    }

    executeMove(attackerKey, moveID) {             //   True           :    False
        const attacker = attackerKey === "player" ? this.playerMonster : this.enemyMonster;
        const defender = attackerKey === "player" ? this.enemyMonster : this.playerMonster;

        //  Use own moves[] copy
        const attackerMove = attacker.moves.find(m => m.id === moveID);
        const moveData = MOVES[moveID];

        if (!moveData) {
            console.error(`Move "${moveID}" not found in MOVES data`);
            return null;
        }

        if (attackerMove.uses <= 0) {
            return { success: false, reason: "No uses left"};
        }

        const damage = this.calculateDamage(moveData);
        defender.health = Math.max(0, defender.health - damage);

        //  Only decrement uses if not infinte
        if (moveData.uses !== Infinity) {
            attackerMove.uses--;
        }

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
        return this.isFainted("player")
        && this.playerHand.length === 0
        && this.playerDeck.length === 0;
    }

    isEnemyDefeated() {
        return this.isFainted("enemy")
        && this.enemyDeck.length === 0;
    }

    //===============================================//
    //  ENEMY AI                                     //
    //===============================================//
    getEnemyMove() {
        const availableMoves = this.enemyMonster.moves.filter(m => m.uses > 0 || m.uses === Infinity);

        //  If all moves are exhausted use the first move anyways
        const moves = availableMoves.length > 0 ? availableMoves : this.enemyMonster.moves;
        if (moves.length == 0) return null;
        return moves[Math.floor(Math.random() * moves.length)].id;
    }

    //  Enemy plays next monster from their deck
    enemyPlayNextMonster() {
        if (this.enemyDeck.length === 0) return null;

        const nextID = this.enemyDeck.shift();
        this.enemyMonster = this.createMonster(nextID);
        return this.enemyMonster;
    }




}