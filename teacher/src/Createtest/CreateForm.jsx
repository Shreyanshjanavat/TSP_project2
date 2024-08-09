import React, { useState, createContext,useEffect } from 'react';
import './CreateForm.css';

// Create a context
export const ClassContext = createContext();

const CreateForm = () => {
    const [subject, setSubject] = useState('');
    const [className, setClassName] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [T_subject, setT_subject] = useState('');
    useEffect(() => {
        const fetchInfo = async () => {
          const id = localStorage.getItem('id'); // Assuming phoneno is stored in localStorage
          if (id) {
            const response = await fetch(`http://localhost:5000/t_data?id=${id}`);
            const data = await response.json();
            setT_subject(data[0].subject);
          //alert(data);
          }
        };
        fetchInfo();
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here

        if (className === '' || totalMarks === '') {
            window.location.replace('/createform');
        } else {
            // Pass className and totalMarks to the context
            // window.alert(className);
           
            window.location.replace(`/testinput/${className}/${totalMarks}/${T_subject}`);
        }
    };

    return (
        // Provide the context value to the context provider
        <ClassContext.Provider value={{ className, totalMarks }}>
            <div className="createform">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                          Subject: {T_subject} 
                            
                        </label>
                    </div>
                    <div>
                        <label>
                            Class:
                            <select value={className} onChange={(e) => setClassName(e.target.value)}>
                                <option value="">Select a class</option>
                                <option value="1">Class 1</option>
                                <option value="2">Class 2</option>
                                <option value="3">Class 3</option>
                                <option value="4">Class 4</option>
                                <option value="5">Class 5</option>
                                <option value="6">Class 6</option>
                                <option value="7">Class 7</option>
                                <option value="8">Class 8</option>
                                <option value="9">Class 9</option>
                                <option value="10">Class 10</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Total Marks:
                            <input
                                type="number"
                                value={totalMarks}
                                onChange={(e) => setTotalMarks(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        </ClassContext.Provider>
    );
}

export default CreateForm;
