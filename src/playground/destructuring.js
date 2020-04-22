const person = {
    name: 'Pierre',
    age: 36,
    location: {
        city: 'Novosibirsk',
        temp: 15
    }
};

const {name, age} = person
const {city, temp} = person.location


console.log(`${name} is ${age}`)

console.log(`It's ${temp} in ${city}`)