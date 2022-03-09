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




    const handleNameChange = (e: string | any) => {

        setNewHamsterName(e.target.value)
        setnewHamsterNameEdited(false)
        if (e.target.value.length>=2){
            setnewHamsterNameEdited(true)
            console.log("name is valid")
        }
        else if (e.target.value.length<=2){
            setnewHamsterNameEdited(false)
            console.log("name is not valid")
        }
    }

    const handleAgeChange = (e: number | any) => {
        const ageIsValid = isValidAge(newHamsterAge)
        setNewHamsterAgeEdited(ageIsValid)
        if (e.target.valueAsNumber) {
            setNewHamsterAge(e.target.valueAsNumber)
        }
        if (ageIsValid) {
            console.log("age is valid")
        }

    }

    const handleFavFoodChange = (e: string | any) => {
        setNewHamsterFavFood(e.target.value)
        setNewHamsterFavFoodEdited(false)
        if (e.target.value.length>=2){
            setNewHamsterFavFoodEdited(true)
            console.log("food is valid")
        }
        else if (e.target.value.length<=2){
            setNewHamsterFavFoodEdited(false)
            console.log("food is not valid")
        }

    }

    const handleLovesChange = (e: string | any) => {
        setNewHamsterLoves(e.target.value);
        setNewHamsterLovesEdited(false)
        if (e.target.value.length>=2){
            setNewHamsterLovesEdited(true)
            console.log("love is valid")
        }
        else if (e.target.value.length<=2){
            setNewHamsterLovesEdited(false)
            console.log("love is not valid")
        }

    }

    const handleImgNameChange = (e: string | any) => {
        setNewHamsterImgName(e.target.value);
        setNewHamsterImgNameEdited(false)
        if (e.target.value.includes('.jpg')){
            setNewHamsterImgNameEdited(true)
            console.log("img is valid")
        }
        else if (!e.target.value.includes('.jpg')){
            setNewHamsterImgNameEdited(false)
            console.log("img is not valid")
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
        

        if (newHamsterNameEdited && newHamsterAgeEdited && newHamsterFavFoodEdited && newHamsterLovesEdited && newHamsterImgNameEdited == true) {
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
        else
            console.log("an imput is still wrong or missing")
    }

    return (
        <div className='new-hamster-container'>
            <input type="text" placeholder="Hamster name" value={newHamsterName} onChange={handleNameChange} />
            <input type="number" placeholder="Age" value={newHamsterAge} onChange={handleAgeChange} />
            <input type="text" placeholder="Food" value={newHamsterFavFood} onChange={handleFavFoodChange} />
            <input type="text" placeholder="Loves" value={newHamsterLoves} onChange={handleLovesChange} />
            <input type="text" placeholder="Picture name" value={newHamsterImgName} onChange={handleImgNameChange} />
            <button onClick={() => newHamster()}>ADD NEW</button>
        </div>
    )

}

// validering 


// function isValidName(name: string): boolean {
//     if (name.length>=2){
//         return true
//     }
//     else
//         return false
    
// }

function isValidAge(age: number): boolean {
    if (age < 0) return false
    if (isNaN(age)) return false
    let ageString = String(age)

    if (ageString.includes(',') || ageString.includes('.')) return false
    return true
}

// function isValidLoves(loves: string): boolean {
//     if (loves.length>=2){
//         return true
//     }
//     else
//         return false
    
// }

// function isValidFood(food: string): boolean {
//     if (food.length>=2){
//         return true
//     }
//     else
//         return false
    
// }

// function isValidImg(img: string): boolean {
//      if(img.includes('.jpg')) return true
//      return false
// }

export default AddHamsters; 