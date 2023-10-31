import React, { useEffect, useState } from 'react';
import './styles.css';
import Select from "react-select";
import Todolist from '../components/Todolist';
import { toast } from "react-toastify";


const AddTodo = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [inputList, setInputList] = useState('');
    const [list, setList] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string; id: number } | null>(null);
    const [userOptions, setUserOptions] = useState<{ value: string; label: string, id: number }[]>([]);
    const apiUrl = "https://todo-list-assignment-fe-rveh.vercel.app/users/get-all-users"; 

    const listOfItems = () => {
        setList((oldItem) => {
            return [...oldItem, inputList];
        });
        setInputList('');
    }

    const deleteItems = (id: any) => {
        setList((oldItem) => {
            return oldItem.filter((array, index) => {
                return index !== id;
            });
        });
    }

    const itemEvent = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputList(event.target.value);
    }

    const saveTodos = () => {
        if (selectedOption) {
            const requestBody = {
                todos: list,
            };

            fetch(`https://todo-list-assignment-fe-rveh.vercel.app/create-todo/${selectedOption.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Todos saved:', data);
                    toast.success("Todo saved succesfully");

                    setList([]);
                })
                .catch(error => console.error('Error saving todos:', error));
        } else {
            console.error('Please select a user before saving todos.');
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const users = data.map((user: any) => ({
                    value: user.username,
                    label: user.username,
                    id: user.id,
                }));
                setUserOptions(users);
                if (selectedOption) {
                    toast.success(`User set to ${selectedOption.label}`, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, [apiUrl]);

    return (
        <div>
            <div className='date-time'>
                <strong>{currentDateTime.toLocaleString()}</strong>
            </div>

            <div className='main-input'>
                <div className='select'>
                    <Select
                        isClearable
                        isSearchable
                        value={selectedOption}
                        options={userOptions}
                        onChange={(newSelectedOption) => {
                            setSelectedOption(newSelectedOption);
                            if (newSelectedOption) {
                                toast.success(`User set to ${newSelectedOption.label}`, {
                                    position: 'top-right',
                                    autoClose: 3000,
                                });
                            }
                        }}
                        placeholder="Search for username"
                    />
                </div>
                <div className='input'>
                    <h3>Enter Todos</h3>
                    <input type='text' placeholder='Add Todo' value={inputList} onChange={itemEvent} />
                    <button type='submit' onClick={listOfItems}>+</button>
                    <ol>
                    {list.map((item,index)=>{
            return <Todolist key={index} id={index} text = {item} onSelect={deleteItems} />
        })}
                    </ol>
                    <div className='btn-save'>
                        <button onClick={saveTodos}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTodo;
