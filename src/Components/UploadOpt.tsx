// src/Components/UploadOpt.tsx

import React, { useState } from 'react';

function UploadOpt() {
  const [showTimerInput, setShowTimerInput] = useState(false);
  const [timerValue, setTimerValue] = useState<string>('');

  const [showPassInput, setShowPassInput] = useState(false);
  const [passValue, setPassValue] = useState<string>('');

  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteValue, setNoteValue] = useState<string>('');

  const handleToggleTimerInput = () => {
    setShowTimerInput(!showTimerInput);
  };

  const handleTogglePassInput = () => {
    setShowPassInput(!showPassInput);
  };
  const handleToggleNoteInput = () => {
    setShowNoteInput(!showNoteInput);
  };
  const handleTimerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimerValue(e.target.value);
  };

  const handlePassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassValue(e.target.value);
  };
  const handleNoteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteValue(e.target.value);
  };

  return (
    <div>
        <div>
            <label>
                Set Timer:
                <input type="checkbox" checked={showTimerInput} onChange={handleToggleTimerInput} />                
            </label>
            
            {showTimerInput && (
                <div>
                <label>
                    
                    <input type="integer" placeholder="Duration in minute intervals" value={timerValue} onChange={handleTimerInputChange} />
                </label>
                </div>
            )}
      </div>
      <div>
            <label>
                Set Password:
                <input type="checkbox" checked={showPassInput} onChange={handleTogglePassInput} />
            </label>
            
            {showPassInput && (
                <div>
                <label>
                    
                    <input type="text" placeholder="Minimum Length of 5 characters and/or numbers" value={passValue} onChange={handlePassInputChange} />
                </label>
                </div>
            )}
      </div>
      <div>
            <label>
                Include a message:
                <input type="checkbox" checked={showNoteInput} onChange={handleToggleNoteInput} />
            </label>
            
            {showNoteInput && (
                <div>
                <label>
                    
                    <input type="text" placeholder="Message..." value={noteValue} onChange={handleNoteInputChange} />
                </label>
                </div>
            )}
      </div>
    </div>
    
    
  );
}

export default UploadOpt;
