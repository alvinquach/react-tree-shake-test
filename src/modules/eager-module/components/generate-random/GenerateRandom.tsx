import React, { useCallback, useState } from 'react';
import { useDependency } from '../../../../hooks/useDependency';
import { RandomService } from '../../../../services/random/RandomService';

export const GenerateRandom = React.memo(() => {

    const randomService = useDependency(RandomService);
    
    const [currentNumber, setCurrentNumber] = useState(randomService.currentNumber);

    const handleButtonClick = useCallback(() => {
        const newNumber = randomService.generateNewNumber();
        setCurrentNumber(newNumber);
    }, [randomService]);

    return (
        <div>
            <div>{`Current Number: ${currentNumber}`}</div>
            <button onClick={handleButtonClick}>
                Generate New Number
            </button>
        </div>
    );

});
