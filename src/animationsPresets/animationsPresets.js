
const containerDriverCards = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const driverCard = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const icon = {
    hidden: {
        opacity: 0,
        pathLength: 0,
        fill: "rgba(255, 255, 255, 1)"
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        fill: "rgba(225, 6, 0,1)"
    }
};

export const driverCards = { containerDriverCards, driverCard, icon };


