import controls from '../../constants/controls';

function getRandomValue() {
    return Math.random() + 1;
}

export function getBlockPower(fighter) {
    const dodgeChance = getRandomValue();
    return fighter.defense * dodgeChance;
}

export function getHitPower(fighter, isCritical = false) {
    const criticalHitChance = isCritical ? 2 : getRandomValue();
    return fighter.attack * criticalHitChance;
}

export function getDamage(attacker, defender, isCritical = false) {
    const hitPower = getHitPower(attacker, isCritical);
    const blockPower = getBlockPower(defender);
    const damage = Math.max(hitPower - blockPower, 0);
    return damage;
}

export async function fight(firstFighter, secondFighter) {
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
                    // const damage = getDamage(firstFighter, secondFighter, true);
                    // secondFighter.health -= damage;
                } else {
                    // const damage = getDamage(firstFighter, secondFighter);
                    // secondFighter.health -= damage;
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
                    // const damage = getDamage(secondFighter, firstFighter, true);
                    // firstFighter.health -= damage;
                } else {
                    // const damage = getDamage(secondFighter, firstFighter);
                    // firstFighter.health -= damage;
                }
            }

            // Check if the fight is over
            if (firstFighter.health <= 0 || secondFighter.health <= 0) {
                isFightOver = true;

                // Resolve the promise with the winner
                resolve(firstFighter.health > secondFighter.health ? firstFighter : secondFighter);
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
//     const initialHealth = fighter.initialHealth;
//     const currentHealth = fighter.health;
//     const healthPercentage = Math.max((currentHealth / initialHealth) * 100, 0);
//     healthBar.style.width = `${healthPercentage}%`;
// }
