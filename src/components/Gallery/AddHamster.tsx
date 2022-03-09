import React, { useState } from 'react'


// add new hamster to the list 
const AddHamsters = () => {

    const [newHamsterName, setNewHamsterName] = useState<string>("")
    const [newHamsterAge, setNewHamsterAge] = useState<number>(0)
    const [newHamsterFavFood, setNewHamsterFavFood] = useState<string>("")
    const [newHamsterLoves, setNewHamsterLoves] = useState<string>("")
    const [newHamsterImgName, setNewHamsterImgName] = useState<string>("")
    
    const [newHamsterNameEdited, setnewHamsterNameEdited] = useState<boolean>(false)
    const [newHamsterAgeEdited, setNewHamsterAgeEdited] = useState<boolean>(false)
    const [newHamsterFavFoodEdited, setNewHamsterFavFoodEdited] = useState<boolean>(false)
    const [newHamsterLovesEdited, setNewHamsterLovesEdited] = useState<boolean>(false)
    const [newHamsterImgNameEdited, setNewHamsterImgNameEdited] = useState<boolean>(false)




    // const [errors, setErrors] = useState<{ newHamsterName:string, newHamsterAge:number, newHamsterFavFood:string, newHamsterLoves:string, newHamsterImgName:string }>();
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    //     const {target: {value}} = event;
    //     setErrors({newHamsterName:''})
    // }
    

    
    // functions to save changed values
    
    const handleNameChange = (e: string | any) =>{

        setNewHamsterName(e.target.value)
        const nameIsValid = isValidName(newHamsterName)
        setnewHamsterNameEdited(nameIsValid)
        if(nameIsValid){
            console.log("name is valid")
        }
    } 
    const handleAgeChange = (e: number | any) => {
        const ageIsValid = isValidAge(newHamsterAge)
        setNewHamsterAgeEdited(ageIsValid)
        if (e.target.valueAsNumber )
        {
            setNewHamsterAge(e.target.valueAsNumber)
        }
        if(ageIsValid){
            console.log("age is valid")
        }

    }
    const handleFavFoodChange = (e: string | any) => {
        const foodIsValid = isValidFood(newHamsterFavFood)
        setNewHamsterFavFoodEdited(foodIsValid)
        setNewHamsterFavFood(e.target.value)
        if(foodIsValid){
            console.log("food is valid")
        }
    }
    const handleLovesChange = (e: string | any) => {
        const lovesIsValid = isValidLoves(newHamsterLoves)
        setNewHamsterLovesEdited(lovesIsValid)
        setNewHamsterLoves(e.target.value);
        if(lovesIsValid){
            console.log("love is valid")
        }
    }
    const handleImgNameChange = (e: string | any) =>{
        const imgIsValid = isValidImg(newHamsterImgName);
        setNewHamsterImgNameEdited(imgIsValid)
        setNewHamsterImgName(e.target.value);
        if(imgIsValid){
            console.log("img is valid")
        }
    }

    // saves everything inside a variable
    let data = {
        name: newHamsterName,
        age: newHamsterAge,
        favFood: newHamsterFavFood,
        loves: newHamsterLoves,
        imgName: newHamsterImgName,
        wins: 0,
        defeats: 0,
        games: 0
    }


    const newHamster = async () => {

        if ( newHamsterNameEdited && newHamsterAgeEdited && newHamsterFavFoodEdited && newHamsterLovesEdited && newHamsterImgNameEdited === true){
            await fetch("/hamsters", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("This is:", data)
                })
                .catch((error) => {
                    console.log("Error:", error)
                })
        }
        else(
            console.log("an imput is not what is wrong")
        )
    }

    return (
        <div className='new-hamster-container'>
            <input type="text" placeholder="Hamster name" value={newHamsterName} onChange={handleNameChange} />
            <input type="number" placeholder="Age" value={newHamsterAge} onChange={handleAgeChange} />
            <input type="text" placeholder="Food" value={newHamsterFavFood} onChange={handleFavFoodChange} />
            <input type="text" placeholder="Loves" value={newHamsterLoves} onChange={handleLovesChange} />
            <input type="text" placeholder="Picture" value={newHamsterImgName} onChange={handleImgNameChange} />
            <button onClick={() => newHamster()}>ADD NEW</button>
        </div>
    )

}

// validering 


function isValidName(name: string): boolean {
    return name.length >= 2
}

function isValidAge(age: number): boolean {
	if( age < 0 ) return false
	if( isNaN(age) ) return false
	let ageString = String(age)

	if( ageString.includes(',') || ageString.includes('.')) return false
	return true
}

function isValidLoves(loves: string): boolean {
	return loves.length >= 2
}

function isValidFood(food: string): boolean {
	return food.length >= 2
}

function isValidImg (img: string): boolean {
  
    // if (img.includes(".jpg")){
    //     return true
    // }
    // else {
    //     return false
    // }

    let results = img.includes(".jpg")
    if (results == true){
        return true
    }
    else{
        return false
    }
}

export default AddHamsters; 