import controls from '../../constants/controls';

function getRandomValue() {
    return Math.random() + 1;
}

export function getBlockPower(fighter) {
    const dodgeChance = getRandomValue();
    const power = fighter.defense * dodgeChance;

    return power;
}

export function getHitPower(fighter) {
    const criticalHitChance = getRandomValue();
    const power = fighter.attack * criticalHitChance;
    return power;
}

export function getDamage(attacker, defender) {
    let damage;
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    if (hitPower < blockPower) {
        damage = 0;
    } else {
        damage = hitPower - blockPower;
    }

    return damage;
}

export async function fight(firstFighter, secondFighter) {
    let firstFighterHealth = firstFighter.health;
    let secondFighterHealth = secondFighter.health;
    return new Promise(resolve => {
        let isFightOver = false;

        // Track the last time a critical strike was performed for each fighter
        let lastCriticalStrikeTime1 = 0;
        let lastCriticalStrikeTime2 = 0;

        const handleKeyPress = event => {
            if (isFightOver) return;

            const key = event.code;

            if (
                key === controls.PlayerOneAttack &&
                key === controls.PlayerOneBlock &&
                key === controls.PlayerOneCriticalHit
            ) {
                const currentTime = new Date().getTime();

                // Check if enough time has passed since the last critical strike
                const isCriticalStrikeAvailable =
                    firstFighter.criticalHitChance > getRandomValue() && currentTime - lastCriticalStrikeTime1 >= 10000;

                if (isCriticalStrikeAvailable) {
                    lastCriticalStrikeTime1 = currentTime;
                    const damage = getDamage(firstFighter, secondFighter);
                    secondFighterHealth -= damage;
                } else {
                    const damage = getDamage(firstFighter, secondFighter);
                    secondFighterHealth -= damage;
                }
            } else if (
                key === controls.PlayerTwoAttack &&
                key === controls.PlayerTwoBlock &&
                key === controls.PlayerTwoCriticalHit
            ) {
                const currentTime = new Date().getTime();

                // Check if enough time has passed since the last critical strike
                const isCriticalStrikeAvailable =
                    secondFighter.criticalHitChance > getRandomValue() &&
                    currentTime - lastCriticalStrikeTime2 >= 10000;

                if (isCriticalStrikeAvailable) {
                    lastCriticalStrikeTime2 = currentTime;
                    const damage = getDamage(secondFighter, firstFighter);
                    firstFighterHealth -= damage;
                } else {
                    const damage = getDamage(secondFighter, firstFighter);
                    firstFighterHealth -= damage;
                }
            }

            // Check if the fight is over
            if (firstFighterHealth <= 0 || secondFighterHealth <= 0) {
                isFightOver = true;

                // Resolve the promise with the winner
                resolve(firstFighterHealth > secondFighterHealth ? firstFighter : secondFighter);
            }
        };

        // Attach the key press event listener
        window.addEventListener('keydown', handleKeyPress);

        // Return a cleanup function to remove the event listener when the fight is over
        // return () => window.removeEventListener('keydown', handleKeyPress);
    });
}

// function updateHealthBar(fighter, position) {
//     const healthBar = document.getElementById(`${position}-fighter-indicator`);
//     const { initialHealth } = fighter;
//     const currentHealth = fighter.health;
//     const healthPercentage = Math.max((currentHealth / initialHealth) * 100, 0);
//     healthBar.style.width = `${healthPercentage}%`;
// }
